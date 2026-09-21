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
    const { selectedTags } = useSearch({ from: '/' })

    useEffect(() => {
        if (selectedTags === undefined || selectedTags === 0){
      setSelected(true)
    } else {
      setSelected(false)
    }
    }, [selectedTags])

    return (
        <TagButtonView
            tag={'all'}
            isSelected={isSelected}
            onClick={ () => {handleClick()}}
        />
    )
}

export default AllButton
