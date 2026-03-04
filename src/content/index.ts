import * as z from "zod";
import { type Resource } from "./resourceBuilder";
import { allResourcesByDoI } from "./resources";

const vibeTags = [
    'chill'
] as const

export const tags = [
    ...vibeTags,
    'coding',
    'prompting',
    'kids',
    'ethics'
] as const

export type Tag = (typeof tags)[number]

export const TagsEnum = z.enum(tags)

export const allResourceNames: Set<string> = new Set()
export const tagToNames: Partial<Record<Tag, Set<string>>> = {}
export const nameToResource: Record<string, Resource> = {}

allResourcesByDoI.forEach((resource) => {
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
