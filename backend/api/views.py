from rest_framework import generics
from api.models import Post
from api.serializers import PostSerializer


class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    ordering = ("-updated_at",)
