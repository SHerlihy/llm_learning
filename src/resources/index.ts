import * as z from "zod";
import { usingClaudeJR } from "./usingClaudeJR";
import { loavableVAntigrav } from "./lovableVAntigrav";

const vibeTags = [
    'chill'
] as const

export const tags = [
    ...vibeTags,
    'coding',
    'prompting'
] as const

export type Tag = (typeof tags)[number]

export const TagsEnum = z.enum(tags)

const Resource = z.object({
    resourceName: z.string(),
    dateOfInclusion: z.date(),
    href: z.string().url(),
    overview: z.string(),
    tags: z.set(TagsEnum),
});

export type Resource = z.infer<typeof Resource>

const allResourcesByDoC: Array<Resource> = [
    loavableVAntigrav,
    usingClaudeJR
]
.sort((a,b)=> b.dateOfInclusion.getTime() - a.dateOfInclusion.getTime())

export const tagToResources: Record<Tag, Array<Resource>> = {}

allResourcesByDoC.forEach((resource) => {
    const tags = resource.tags
    tags.forEach((tag) => {
        if (Object.hasOwn(tagToResources, tag)) {
            const tagResources = tagToResources[tag]
            tagResources.push(resource)

            return
        }

        tagToResources[tag] = [resource]
    })
})
