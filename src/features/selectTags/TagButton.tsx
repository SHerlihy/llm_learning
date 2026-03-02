import React, { useEffect, useState } from 'react'
import { useSearch } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Tag } from '@/resources'

const unselectedColor = 'bg-grey-100'

type Props = {
    tag: Tag
    selectColor?: string
}
    & Pick<React.ComponentProps<"button">, "onClick">

const TagButton = ({
    tag,
    selectColor = 'bg-green-100',
    onClick
}: Props) => {
    const [isSelected, setSelected] = useState(false)
    const { tags } = useSearch({ from: '/' })

    useEffect(() => {
        if(!tags){
            setSelected(false)
            return
        }

        if (tags[tag] === undefined) {
            setSelected(false)
        } else {
            setSelected(true)
        }
    }, [tag, tags])

    return (
        <Button
            onClick={onClick}
            className={`
                ${isSelected ? selectColor : unselectedColor}
            `}
        >
            {tag}
        </Button>
    )
}

export default TagButton
