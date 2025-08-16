export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'user'
  createdAt: string
  updatedAt: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type SignupCredentials = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type AuthTokens = {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export type AuthResponse = {
  user: User
  tokens: AuthTokens
}