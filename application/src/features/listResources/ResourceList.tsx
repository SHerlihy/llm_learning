import { useSearch } from "@tanstack/react-router"
import ResourceItem from "./ResourceItem"
import { allResourceNames, nameToResource, Tag, tagToNamesByDoI } from "@/content"

//composite component to show feedback components
const ResourceList = () => {
    const { tags: tagsObj } = useSearch({ from: '/' })

    if (!tagsObj || Object.keys(tagsObj).length < 1) { return null }

    const tags = Object.keys(tagsObj) as Array<Tag>

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

    const resourceNames= Array.from(intersectionTaged)
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
