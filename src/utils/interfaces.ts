export interface UserStoreState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface User {
  id: string;
  name: string;
  profileImg: string;
  registrationDate: string;
  surname: string;
  username: string;
  password?: string;
  bio?: string;
}

// api response posts
export interface Post {
  id: string;
  userId: string;
  content: string;
  publishDate: string;
  nLikes: number;
  nReplies: number;
  user: User;
}

export interface Paginator {
  total: number;
  offset: number;
  limit: number;
}

export interface PostsResponse {
  paginator: Paginator;
  result: Post[];
}
