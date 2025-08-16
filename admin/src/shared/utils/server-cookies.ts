import { cookies } from 'next/headers'
import { User } from '@/shared/types/auth'

export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user'
} as const

export async function getServerCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value
}

export async function setServerCookie(name: string, value: string, options?: {
  maxAge?: number
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  path?: string
}) {
  const cookieStore = await cookies()
  cookieStore.set(name, value, {
    httpOnly: options?.httpOnly ?? true,
    secure: options?.secure ?? process.env.NODE_ENV === 'production',
    sameSite: options?.sameSite ?? 'strict',
    path: options?.path ?? '/',
    maxAge: options?.maxAge ?? 60 * 60 * 24 * 7 // 7 days default
  })
}

export async function deleteServerCookie(name: string) {
  const cookieStore = await cookies()
  cookieStore.delete(name)
}

export async function clearServerAuthCookies() {
  await deleteServerCookie(COOKIE_NAMES.ACCESS_TOKEN)
  await deleteServerCookie(COOKIE_NAMES.REFRESH_TOKEN)
  await deleteServerCookie(COOKIE_NAMES.USER)
}

export async function getCurrentUserFromCookies(): Promise<User | null> {
  try {
    const userCookie = await getServerCookie(COOKIE_NAMES.USER)
    if (userCookie) {
      return JSON.parse(userCookie)
    }
    return null
  } catch (error) {
    console.error('Failed to parse user cookie:', error)
    return null
  }
}

export async function isAuthenticatedServer(): Promise<boolean> {
  const accessToken = await getServerCookie(COOKIE_NAMES.ACCESS_TOKEN)
  const refreshToken = await getServerCookie(COOKIE_NAMES.REFRESH_TOKEN)
  return !!(accessToken || refreshToken)
}