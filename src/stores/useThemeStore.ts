import { create } from 'zustand'

const useTheme = create((set) => ({
  theme: 'light',
  updateTheme: (newTheme: any) => set({ theme: newTheme }),
}))