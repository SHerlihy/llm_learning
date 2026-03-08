import { tags, TagsEnum } from '@/content'
import ResourceList from '@/features/listResources/ResourceList'
import TagSelector from '@/features/selectTags/TagSelector'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { z } from 'zod'

const resourceTagSchema = z.object({
    tags: z.optional(z.record(TagsEnum, z.boolean()))
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
