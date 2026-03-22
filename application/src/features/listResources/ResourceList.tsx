import { useSearch } from "@tanstack/react-router"
import { allResourceNames, Tag, tagToNamesByDoI } from "@/content"
import ResourceListView from "./ResourceListView"

const getResourceIntersectionFromTags = (tags: Array<Tag>) => {
    let intersectionTaged = allResourceNames

    tags.forEach((tag) => {
        if (tagToNamesByDoI[tag] === undefined) {
            intersectionTaged = new Set([])
            // feedback this tag has no resources
            return
        }

        const curIntersection = intersectionTaged.intersection(tagToNamesByDoI[tag])
        // if 0 size feedback cur tag led to no resources

        intersectionTaged = curIntersection
    })

    return intersectionTaged
}

//composite component to show feedback components
const ResourceList = () => {
    const { tags: tagsObj } = useSearch({ from: '/' })

    const tags: Array<Tag> = tagsObj ? Object.keys(tagsObj) as Array<Tag> : []

    const intersectionTaged = getResourceIntersectionFromTags(tags)

    const resourceNames = Array.from(intersectionTaged)

    return (
        <ResourceListView
            tags={tags}
            resourceNames={resourceNames}
        />
    )
}

export default ResourceList
