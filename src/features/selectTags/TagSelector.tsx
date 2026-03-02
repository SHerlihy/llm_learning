import { Tag, tags } from '@/resources'
import TagButton from './TagButton'
import { useNavigate } from '@tanstack/react-router'

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
                if (!params.tags) {
                    params['tags'] = {}
                }

                if (params.tags[tag] === undefined) {
                    params.tags[tag] = true
                    return params
                } else {
                    delete params.tags[tag]
                    return params
                }
            },
        })
    }

    return (
        <article>
            {tags.map((tag) => (<TagButton key={tag} tag={tag} onClick={() => { handleClick(tag) }} />))}
        </article>
    )
}

export default TagSelector
