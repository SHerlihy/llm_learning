import React, { useEffect, useState } from 'react'
import { useSearch } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Tag } from '@/resources'

const unselectedColor = 'bg-(--unselected)'

type Props = {
    tag: Tag
    selectColor?: string
}
    & Pick<React.ComponentProps<"button">, "onClick">

const TagButton = ({
    tag,
    selectColor = 'bg-(--selected)',
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
