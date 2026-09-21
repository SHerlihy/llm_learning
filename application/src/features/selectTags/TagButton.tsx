import React, { useEffect, useState } from 'react'
import { useSearch } from '@tanstack/react-router'
import { Tag } from '@/content'
import TagButtonView from './TagButtonView'

type Props = {
    tag: Tag
}
    & Pick<React.ComponentProps<"button">, "onClick">

const TagButton = ({
    tag,
    onClick
}: Props) => {
    const [isSelected, setSelected] = useState(false)
    const { tags } = useSearch({ from: '/' })

    useEffect(() => {
        if (!tags) {
            setSelected(false)
            return
        }

        setSelected(tags[tag])
    }, [tag, tags])

    return (
        <TagButtonView
            tag={tag}
            isSelected={isSelected}
            onClick={onClick}
        />
    )
}

export default TagButton
