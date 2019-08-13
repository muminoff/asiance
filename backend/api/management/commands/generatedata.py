from django.core.management import execute_from_command_line
from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.files import File
from api.models import Author, Post
from tempfile import TemporaryFile
from faker import Faker
import requests
import random
import tqdm
import uuid


class Command(BaseCommand):
    help = "Generate fake data"
    can_import_settings = True
    max_authors = random.randint(10, 50)
    posts_per_author = 2
    providers = ("fr_FR", "ko_KR")

    def handle(self, *args, **options):
        self.stdout.write(f"Generating {self.max_authors} authors ...")
        self.generate_authors()
        total_posts = Author.objects.count() * self.posts_per_author
        self.stdout.write(f"Generating {total_posts} posts ...")
        self.generate_posts()

    def download_to_file_field(self, url, field):
        with TemporaryFile() as tf:
            r = requests.get(url, stream=True)
            for chunk in r.iter_content(chunk_size=4096):
                tf.write(chunk)

            tf.seek(0)
            filename = str(uuid.uuid4()) + ".jpg"
            field.save(filename, File(tf))

    def generate_authors(self):

        for x in tqdm.tqdm(range(1, self.max_authors + 1, 1)):
            locale = random.choice(self.providers)
            fake_author_data = Faker(locale)
            author_item = {
                "name": fake_author_data.name(),
                "role": fake_author_data.job(),
                "location": fake_author_data.city(),
            }
            author = Author(**author_item)
            self.download_to_file_field(settings.AVATAR_URL, author.avatar)
            author.save()

    def generate_posts(self):
        fake_posts = list()

        for author in tqdm.tqdm(Author.objects.all()):

            for x in range(1, self.posts_per_author + 1, 1):
                fake_post_data = Faker()
                resp = requests.get(settings.POST_IMAGE_URL)
                image_url = resp.url
                post_item = {
                    "author": author,
                    "title": fake_post_data.sentence(
                        nb_words=6, variable_nb_words=True, ext_word_list=None
                    ),
                    "body": fake_post_data.texts(
                        nb_texts=30, max_nb_chars=200, ext_word_list=None
                    )[0],
                    "tags": fake_post_data.words(
                        nb=3, ext_word_list=None, unique=False
                    ),
                    "image_url": image_url
                }
                post = Post(**post_item)
                fake_posts.append(post)

        Post.objects.bulk_create(fake_posts)
