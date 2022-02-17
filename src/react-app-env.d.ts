// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsListSlice {
  posts: Post[];
  selectedPostId: number;
}

interface PostsState {
  postsListSlice: PostsListSlice;
  postDetailsSlice: PostDetailsSlice;
}

type RootState = ReturnType<typeof rootReducer>;

interface Comment {
  body: string;
  id: number;
  postId: number;
}

interface PostDetailsSlice {
  body: string;
  id: number;
  title: string;
  comments: Comment[];
}

interface CommentsSlice {
  comments: Comment[];
}
