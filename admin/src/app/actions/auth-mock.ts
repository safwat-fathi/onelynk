'use server'

import { LoginCredentials, SignupCredentials } from "@/shared/types/auth";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


// Mock authentication for development
// Replace this with actual API calls in production

const MOCK_USER = {
  id: '1',
  email: 'admin@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'admin' as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

const MOCK_TOKENS = {
  accessToken: 'mock_access_token_' + Math.random().toString(36).substring(7),
  refreshToken: 'mock_refresh_token_' + Math.random().toString(36).substring(7),
  expiresIn: 3600
}

export async function loginActionMock(credentials: LoginCredentials) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock validation
    if (credentials.email !== 'admin@example.com' || credentials.password !== 'password') {
      throw new Error('Invalid email or password')
    }

    // Set cookies server-side
    const cookieStore = await cookies()
    
    cookieStore.set('access_token', MOCK_TOKENS.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    
    cookieStore.set('refresh_token', MOCK_TOKENS.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    
    cookieStore.set('user', JSON.stringify(MOCK_USER), {
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

export async function signupActionMock(credentials: SignupCredentials) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newUser = {
      ...MOCK_USER,
      email: credentials.email,
      firstName: credentials.firstName,
      lastName: credentials.lastName
    }

    // Set cookies server-side
    const cookieStore = await cookies()
    
    cookieStore.set('access_token', MOCK_TOKENS.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    
    cookieStore.set('refresh_token', MOCK_TOKENS.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    
    cookieStore.set('user', JSON.stringify(newUser), {
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

export async function logoutActionMock() {
  const cookieStore = await cookies()
  
  // Clear all auth cookies
  cookieStore.delete('access_token')
  cookieStore.delete('refresh_token')
  cookieStore.delete('user')
  
  // Redirect to login
  redirect('/auth/login')
}