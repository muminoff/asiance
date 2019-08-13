from django.urls import path
from api import views

urlpatterns = [
    path("posts/", views.PostListView.as_view(), name="list-all-posts")]
