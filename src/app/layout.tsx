import '../../global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body className='flex items-stretch justify-center'>
        {children}
      </body>
    </html>
  )
}
