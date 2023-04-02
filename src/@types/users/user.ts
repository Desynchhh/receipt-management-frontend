export interface FullUserObject {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  apiToken?: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface UserDetails {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
