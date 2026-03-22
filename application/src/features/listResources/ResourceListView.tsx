import ResourceItem from "./ResourceItem"
import { nameToResource, Tag } from "@/content"

export type Props = {
    tags: Array<Tag>
    resourceNames: Array<string>
}

//composite component to show feedback components
const ResourceListView = ({
    tags,
    resourceNames
}: Props) => {
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

export default ResourceListView
