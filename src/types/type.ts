export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  permissions: string[];
  role: string;
}
