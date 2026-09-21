import { Tag, tags, tagToBool, tagToPos } from '@/content'
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
              const pos = tagToPos[tag].pos
        navigate({
            search: (params) => {
                if (params.selectedTags === undefined) {
                    params['selectedTags'] = pos
                    return params
                }

                params.selectedTags = params.selectedTags ^ pos
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
