import FlashcardPage from '@/pages/FlashcardPage'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const schema = z.object({
    resourceName: z.string()
})

export const Route = createFileRoute('/flashcard')({
    component: FlashcardPage,
    validateSearch: schema
})
