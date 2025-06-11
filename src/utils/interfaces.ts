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
}
