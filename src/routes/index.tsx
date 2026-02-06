import { createFileRoute } from '@tanstack/react-router'
import RoseDay from '../components/RoseDay'
import '../App.css'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return <RoseDay />
}
