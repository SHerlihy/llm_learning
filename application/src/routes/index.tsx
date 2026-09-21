import { tags, TagBoolSchema } from '@/content'
import ResourceList from '@/features/listResources/ResourceList'
import TagSelector from '@/features/selectTags/TagSelector'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const resourceTagSchema = z.object({
    tags: z.optional(TagBoolSchema)
})

export const Route = createFileRoute('/')({
    component: Home,
    validateSearch: resourceTagSchema
})

function Home() {
    return (
        <>
            <TagSelector tags={tags} />
            <ResourceList />
        </>
    )
}
