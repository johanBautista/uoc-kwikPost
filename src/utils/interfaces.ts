///////////////////////
// state interfaces stores
///////////////////////
export interface IAuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
export interface IPostsState {
  posts: Post[];
  paginator: Paginator;
  loading: boolean;
  error: string | null;
}
export interface IUserState {
  user: User | null;
  posts: Post[];
  paginator: Paginator;
  loading: boolean;
  error: string | null;
}

///////////////////////
// api response auth
///////////////////////
export interface AuthResponse {
  token: string;
  user: User;
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

export interface UserResponse {
  id: string;
  name: string;
  profileImg: string;
  registrationDate: string;
  surname: string;
  username: string;
  password?: string;
  bio?: string;
}
