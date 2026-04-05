import Flashcard from '@/pages/Flashcard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/flashcard')({
    component: Flashcard
})
