'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LoginCredentials, SignupCredentials, AuthResponse } from '@/src/shared/types/auth'
import { API_BASE_URL, API_ENDPOINTS } from '@/src/shared/constants/api'
import { loginActionMock, signupActionMock, logoutActionMock } from './auth-mock'

// For development, use mock authentication
// Set USE_MOCK_AUTH to false when you have a real API
const USE_MOCK_AUTH = true

export async function loginAction(credentials: LoginCredentials) {
  if (USE_MOCK_AUTH) {
    return loginActionMock(credentials)
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    const data: AuthResponse = await response.json()
    const { tokens, user } = data

    // Set cookies server-side
    const cookieStore = await cookies()
    
    cookieStore.set('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    
    cookieStore.set('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    
    cookieStore.set('user', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Login failed' 
    }
  }
}

export async function signupAction(credentials: SignupCredentials) {
  if (USE_MOCK_AUTH) {
    return signupActionMock(credentials)
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNUP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Signup failed')
    }

    const data: AuthResponse = await response.json()
    const { tokens, user } = data

    // Set cookies server-side
    const cookieStore = await cookies()
    
    cookieStore.set('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    
    cookieStore.set('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    
    cookieStore.set('user', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return { success: true }
  } catch (error) {
    console.error('Signup error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Signup failed' 
    }
  }
}

export async function logoutAction() {
  if (USE_MOCK_AUTH) {
    return logoutActionMock()
  }
  
  const cookieStore = await cookies()
  
  try {
    const refreshToken = cookieStore.get('refresh_token')?.value
    if (refreshToken) {
      await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })
    }
  } catch (error) {
    console.error('Logout request failed:', error)
  } finally {
    // Clear all auth cookies
    cookieStore.delete('access_token')
    cookieStore.delete('refresh_token')
    cookieStore.delete('user')
    
    // Redirect to login
    redirect('/auth/login')
  }
}