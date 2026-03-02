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
                //@ts-ignore
                if (Object.hasOwn(params, 'tags') && params.tags.find(tag)) {
                    //@ts-ignore
                    const tagIdx = params.tags.findIndex(tag)
                    params.tags.splice(tagIdx)
                    return params
                }

                if (!Object.hasOwn(params, 'tags')) {
                    params['tags'] = []
                }

                params.tags.push(tag)

                return params
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
