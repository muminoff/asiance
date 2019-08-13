from rest_framework import serializers
from api.models import Author, Post


class UnixTimestampField(serializers.ReadOnlyField):
    def to_representation(self, value):

        if not value:
            return None

        return int(value.strftime("%s"))


class AuthorSerializer(serializers.ModelSerializer):
    created_at = UnixTimestampField()
    updated_at = UnixTimestampField()

    class Meta:
        model = Author
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    created_at = UnixTimestampField()
    updated_at = UnixTimestampField()

    class Meta:
        model = Post
        fields = "__all__"
