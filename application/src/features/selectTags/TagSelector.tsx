import { Tag, tags, tagToBool } from '@/content'
import TagButton from './TagButton'
import { useNavigate } from '@tanstack/react-router'
import AllButton from './AllButton'

type Props = {
    tags: typeof tags
}

const TagSelector = ({
    tags
}: Props) => {
    const navigate = useNavigate({ from: '/' })

    const handleClick = (tag: Tag) => {
        navigate({
            search: (params) => {
                if (params.tags === undefined) {
                    params['tags'] = tagToBool
                }

                if (params.tags === undefined){
                    throw TypeError("Search params tags not set.")
                }

                if (params.tags[tag] !== true) {
                    params.tags[tag] = true
                    return params
                }

                    params.tags[tag] = false
                    return params
            },
        })
    }

    return (
        <article>
            <AllButton />
            {tags.map((tag) => (<TagButton key={tag} tag={tag} onClick={() => { handleClick(tag) }} />))}
        </article>
    )
}

export default TagSelector
