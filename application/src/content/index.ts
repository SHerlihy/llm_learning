import * as z from "zod";
import { type Resource } from "./resourceBuilder";
import { allResources } from "@/content/resources";

const vibeTags = [
    'chill'
] as const

export const tags = [
    ...vibeTags,
    'remember',
    'training',
    'best for',
    'coding',
    'prompting',
    'kids',
    'ethics',
    'agent',
    'security',
    'art',
    'cost',
    'commerce'
] as const

export const tagToBool = Object.create(null)
const tagBoolSchema = Object.create(null)

tags.forEach((tag)=>{
  tagToBool[tag] = false
  tagBoolSchema[tag] = z.boolean().default(false)
})

Object.seal(tagToBool)
export const TagBoolSchema = z.object(tagBoolSchema)


export type Tag = (typeof tags)[number]
export type NameToResourceByDoI = {
    [key: string]: Resource
}

export const TagsEnum = z.enum(tags)

export const allResourceNames: Set<string> = new Set()

export const tagToNamesByDoI: Partial<Record<Tag, Set<string>>> = {}
export const nameToResource: Record<string, Resource> = {}

allResources
    .sort((a, b) => b.dateOfInclusion.getTime() - a.dateOfInclusion.getTime())
    .forEach((resource) => {
        const { resourceName, tags } = resource

        allResourceNames.add(resourceName)

        nameToResource[resourceName] = resource

        tags.forEach((tag) => {
            if (tagToNamesByDoI[tag] === undefined) {
                tagToNamesByDoI[tag] = new Set()
            }

            tagToNamesByDoI[tag].add(resource.resourceName)
        })
    })
