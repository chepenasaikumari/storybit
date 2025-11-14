
import './globals.css'
import React from 'react'
import Header from '../components/Header'

export const metadata = {
  title: 'My Streaming Dashboard',
  description: 'A simple Next.js streaming dashboard using TMDB'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pt-20">
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  )
}
