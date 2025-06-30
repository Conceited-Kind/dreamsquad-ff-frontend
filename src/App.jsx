import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import AppLayout from '@/app/layout/AppLayout'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}