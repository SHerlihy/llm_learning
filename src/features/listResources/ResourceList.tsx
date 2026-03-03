import { Tag, tagToResources } from "@/resources"
import { useSearch } from "@tanstack/react-router"
import ResourceItem from "./ResourceItem"

const ResourceList = () => {
    const { tags } = useSearch({ from: '/' })

    if (!tags || Object.keys(tags).length < 1) { return null }

    const tagOne = Object.keys(tags)[0] as Tag

    const selectedResources = tagToResources[tagOne]

    if(selectedResources === undefined){return <p>No resources available for: {tagOne}</p>}

    return (
        <section>
            {selectedResources.map((resource) => {
                return (<ResourceItem key={resource.resourceName} resource={resource} />)
            })
            }
        </section>
    )
}

export default ResourceList
