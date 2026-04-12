import { type Resource } from "@/content/resourceBuilder"

import { Card } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"

type Props = {
    resource: Resource
}

const ResourceItem = ({
    resource
}: Props) => {
    const { resourceName, href, overview, flashcards } = resource

    return (
        <Card className="m-2 p-4">
            <h2>{resourceName}</h2>
            <Link
                to={href}
                className={`
                    text-blue-600
                    visited:text-(--selected)
                    hover:cursor-pointer
                    active:text-green-800
                `}
            >
                {href}
            </Link>
            <p>{overview}</p>
            {Object.keys(flashcards).length > 0 && (
                <Link
                    to='/flashcard'
                    search={{resourceName: resourceName}}
                    className={`
                    text-blue-600
                    visited:text-(--selected)
                    hover:cursor-pointer
                    active:text-green-800
                `}
                >
                    Flashcards
                </Link>
            )}
        </Card>
    )
}

export default ResourceItem
