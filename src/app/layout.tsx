import '../../global.css'
import DragProvider from '../context/DndContext'
import GameProvider from '../context/gameContext'
import SocketProvider from '../context/socketContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body className='flex items-stretch justify-center bg-slate-600 text-slate-50'>
        <SocketProvider>
          <GameProvider>
            <DragProvider>
              {children}
            </DragProvider>
          </GameProvider>
        </SocketProvider>
      </body>
    </html>
  )
}
