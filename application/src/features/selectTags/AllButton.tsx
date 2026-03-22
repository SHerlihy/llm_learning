import { useEffect, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import TagButtonView from './TagButtonView'

const AllButton = () => {
    const navigate = useNavigate({ from: '/' })

    const handleClick = () => {
        navigate({
            search: () => {
                return {}
            },
        })
    }

    const [isSelected, setSelected] = useState(false)
    const { tags } = useSearch({ from: '/' })

    useEffect(() => {
        if (!tags) {
            setSelected(true)
            return
        } else {
            setSelected(false)
            return
        }
    }, [tags])

    return (
        <TagButtonView
            tag={'all'}
            isSelected={isSelected}
            onClick={ () => {handleClick()}}
        />
    )
}

export default AllButton
