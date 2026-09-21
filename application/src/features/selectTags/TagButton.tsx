import React, { useEffect, useState } from 'react'
import { useSearch } from '@tanstack/react-router'
import { Tag, tagToPos } from '@/content'
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
    const { selectedTags } = useSearch({ from: '/' })

    useEffect(() => {
        if (!selectedTags) {
            setSelected(false)
            return
        }

        const pos = tagToPos[tag].pos
        if (selectedTags > (selectedTags ^ pos)){
          setSelected(true)
        } else {
          setSelected(false)
        }

    }, [tag, selectedTags])

    return (
        <TagButtonView
            tag={tag}
            isSelected={isSelected}
            onClick={onClick}
        />
    )
}

export default TagButton
