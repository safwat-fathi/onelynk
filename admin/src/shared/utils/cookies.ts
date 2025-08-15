'use client'

export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user'
} as const

export const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`
}

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`
}

export const clearAuthCookies = () => {
  deleteCookie(COOKIE_NAMES.ACCESS_TOKEN)
  deleteCookie(COOKIE_NAMES.REFRESH_TOKEN)
  deleteCookie(COOKIE_NAMES.USER)
}