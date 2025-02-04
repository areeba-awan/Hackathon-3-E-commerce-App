export const metadata = {
  title: 'Admin Panel',
  description: 'Created by Areeba Awan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
