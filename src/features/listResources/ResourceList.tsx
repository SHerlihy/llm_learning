import { allResourceNames, nameToResource, Tag, tagToNames } from "@/resources"
import { useSearch } from "@tanstack/react-router"
import ResourceItem from "./ResourceItem"

const ResourceList = () => {
    const { tags: tagsObj } = useSearch({ from: '/' })

    if (!tagsObj || Object.keys(tagsObj).length < 1) { return null }

    const tags = Object.keys(tagsObj) as Array<Tag>

    const allTaged = tags.map((tag) => {
        if (tagToNames[tag] === undefined) { return new Set([]) }

        return tagToNames[tag]
    }, [] as Array<Set<string>>)

    const intersectionTaged = allTaged.reduce((acc, cur) => {
        return acc.intersection(cur)
    }, allResourceNames)

    const resourceNames = Array.from(intersectionTaged)

    if (resourceNames.length < 1) { return <p>No resources available for: {tags.join(", ")}</p> }

    return (
        <section>
            {resourceNames.map((resourceName) => {
                const resource = nameToResource[resourceName]
                return (<ResourceItem key={resourceName} resource={resource} />)
            })
            }
        </section>
    )
}

export default ResourceList
