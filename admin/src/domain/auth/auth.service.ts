import { httpClient } from '@/src/infrastructure/api/http-client'
import { API_ENDPOINTS } from '@/src/shared/constants/api'
import { COOKIE_NAMES, setCookie, getCookie, clearAuthCookies } from '@/src/shared/utils/cookies'
import {
  LoginCredentials,
  SignupCredentials,
  AuthResponse,
  User
} from '@/src/shared/types/auth'

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await httpClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials,
        { withAuth: false }
      )

      // Store tokens and user data in cookies
      const { tokens, user } = response
      setCookie(COOKIE_NAMES.ACCESS_TOKEN, tokens.accessToken, 1) // 1 day
      setCookie(COOKIE_NAMES.REFRESH_TOKEN, tokens.refreshToken, 7) // 7 days
      setCookie(COOKIE_NAMES.USER, JSON.stringify(user), 7)

      return response
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const response = await httpClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.SIGNUP,
        credentials,
        { withAuth: false }
      )

      // Store tokens and user data in cookies
      const { tokens, user } = response
      setCookie(COOKIE_NAMES.ACCESS_TOKEN, tokens.accessToken, 1)
      setCookie(COOKIE_NAMES.REFRESH_TOKEN, tokens.refreshToken, 7)
      setCookie(COOKIE_NAMES.USER, JSON.stringify(user), 7)

      return response
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      const refreshToken = getCookie(COOKIE_NAMES.REFRESH_TOKEN)
      if (refreshToken) {
        await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken })
      }
    } catch (error) {
      console.error('Logout request failed:', error)
    } finally {
      clearAuthCookies()
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login'
      }
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userCookie = getCookie(COOKIE_NAMES.USER)
      if (userCookie) {
        return JSON.parse(userCookie)
      }

      // Fallback: fetch from API
      const user = await httpClient.get<User>(API_ENDPOINTS.AUTH.ME)
      setCookie(COOKIE_NAMES.USER, JSON.stringify(user), 7)
      return user
    } catch (error) {
      console.error('Get current user failed:', error)
      return null
    }
  }

  isAuthenticated(): boolean {
    const accessToken = getCookie(COOKIE_NAMES.ACCESS_TOKEN)
    const refreshToken = getCookie(COOKIE_NAMES.REFRESH_TOKEN)
    return !!(accessToken || refreshToken)
  }

  getAccessToken(): string | null {
    return getCookie(COOKIE_NAMES.ACCESS_TOKEN)
  }

  getRefreshToken(): string | null {
    return getCookie(COOKIE_NAMES.REFRESH_TOKEN)
  }
}

export const authService = new AuthService()