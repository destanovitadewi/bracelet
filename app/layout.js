// /app/layout.js atau /app/layout.tsx
import './globals.css'
import { AuthProvider } from './contexts/AuthContext'
import { KeranjangProvider } from './contexts/KeranjangContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'Gelangku.id - Toko Gelang Online',
  description: 'Temukan berbagai gelang cantik dan unik di Gelangku.id',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <AuthProvider>
          <KeranjangProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </KeranjangProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
