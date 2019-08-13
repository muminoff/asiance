from rest_framework import generics
from api.models import Post
from api.serializers import PostSerializer


class PostListView(generics.ListAPIView):
    queryset = Post.objects.order_by("?")
    serializer_class = PostSerializer
    ordering = ("-updated_at",)
