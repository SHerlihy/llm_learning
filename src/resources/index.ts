import * as z from "zod";
import { usingClaudeJR } from "./usingClaudeJR";
import { loavableVAntigrav } from "./lovableVAntigrav";
import { type Resource } from "./resourceBuilder";

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

const allResourcesByDoC: Array<Resource> = [
    loavableVAntigrav,
    usingClaudeJR
]
    .sort((a, b) => b.dateOfInclusion.getTime() - a.dateOfInclusion.getTime())

export const allResourceNames: Set<string> = new Set()
export const tagToNames: Partial<Record<Tag, Set<string>>> = {}
export const nameToResource: Record<string, Resource> = {}

allResourcesByDoC.forEach((resource) => {
    allResourceNames.add(resource.resourceName)
    nameToResource[resource.resourceName] = resource

    const tags = resource.tags
    tags.forEach((tag) => {
        if (tagToNames[tag] === undefined) {
            tagToNames[tag] = new Set()
        }

        tagToNames[tag].add(resource.resourceName)
    })
})
