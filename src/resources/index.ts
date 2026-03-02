import * as z from "zod";
import { usingClaudeJR } from "./usingClaudeJR";

const vibeTags = [
    'chill'
] as const

export const tags = [
    ...vibeTags,
    'coding',
    'prompting'
] as const

export type Tag = (typeof tags)[number]

const TagsEnum = z.enum(tags)

const Resource = z.object({
    resourceName: z.string(),
    dateOfInclusion: z.date(),
    href: z.string().url(),
    overview: z.string(),
    tags: z.set(TagsEnum),
});

export type Resource = z.infer<typeof Resource>

const allResources = [
    usingClaudeJR
]

const tagToResources: Record<string, Array<string>> = {}

allResources.forEach(({ resourceName, tags }) => {
    tags.forEach((tag) => {
        if (Object.hasOwn(tagToResources, tag)) {
            const tagResources = tagToResources[tag]
            tagResources.push(resourceName)

            return
        }

        tagToResources[tag] = [resourceName]
    })
})
