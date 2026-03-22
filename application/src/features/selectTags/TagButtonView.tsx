import React from 'react'
import { Button } from '@/components/ui/button'
import { Tag } from '@/content'

const unselectedColor = 'bg-(--unselected)'

type Props = {
    tag: Tag | 'all',
    isSelected: boolean,
    selectColor?: string
}
    & Pick<React.ComponentProps<"button">, "onClick">

const TagButtonView = ({
    tag,
    isSelected,
    onClick,
    selectColor = 'bg-(--selected)'
}: Props) => {
    return (
        <Button
            onClick={onClick}
            className={`
                m-2
                ${isSelected ? selectColor : unselectedColor}
                hover:bg-(--hover)
                hover:cursor-pointer
                active:bg-green-800
            `}
        >
            {tag}
        </Button>
    )
}

export default TagButtonView
