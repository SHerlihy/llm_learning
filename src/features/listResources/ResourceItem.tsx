import { type Resource } from "@/resources"

import { Card } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"

type Props = {
    resource: Resource
}

const ResourceItem = ({
    resource
}: Props) => {
    const { resourceName, href, overview } = resource

    return (
        <Card>
            <h2>{resourceName}</h2>
            <Link to={href}>{href}</Link>
            <p>{overview}</p>
        </Card>
    )
}

export default ResourceItem
