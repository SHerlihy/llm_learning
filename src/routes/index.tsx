import TagSelector from '@/features/selectTags/TagSelector'
import { tags } from '@/resources'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { z } from 'zod'

const resourceTagSchema = z.object({
    tags: z.array(z.literal(tags))
})

type ResourceTag = z.infer<typeof resourceTagSchema>

export const Route = createFileRoute('/')({
    component: Home,
  validateSearch: resourceTagSchema
})

function Home() {
    const router = useRouter()
    const state = Route.useLoaderData()

    return (
        <TagSelector tags={tags} />
    )
}
