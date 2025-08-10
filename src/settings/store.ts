
import { create } from 'zustand'

type Theme = 'light' | 'dark' | 'system'

type SettingsState = {
  theme: Theme
  timezone: string
  setTheme: (t: Theme) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: 'light',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  setTheme: (t) => {
    document.documentElement.classList.toggle('dark', t === 'dark')
    set({ theme: t })
  }
}))
