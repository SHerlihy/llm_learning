import { useSearch } from "@tanstack/react-router"
import { tags as allTags, allResourceNames, Tag, tagToNamesByDoI } from "@/content"
import ResourceListView from "./ResourceListView"

const getResourceIntersectionFromTags = (tags: Array<Tag>) => {
    let intersectionTaged = allResourceNames

    tags.forEach((tag) => {
        if (tagToNamesByDoI[tag] === undefined) {
            intersectionTaged = new Set([])
            // feedback this tag has no resources
            return
        }

        const curIntersection = intersectionTaged.intersection(tagToNamesByDoI[tag])
        // if 0 size feedback cur tag led to no resources

        intersectionTaged = curIntersection
    })

    return intersectionTaged
}

//composite component to show feedback components
const ResourceList = () => {
    const { selectedTags } = useSearch({ from: '/' })

  let sTags = selectedTags

  if (sTags===undefined){
    sTags=0
  }

  const tags: Array<Tag> = []
  let idx = 0
  while (sTags > 0){
    sTags--
    while (sTags % 2 > 0){
      sTags = sTags >> 1
      idx++
    }
    tags.push(allTags[idx])
  }

    const intersectionTaged = getResourceIntersectionFromTags(tags)

    const resourceNames = Array.from(intersectionTaged)

    return (
        <ResourceListView
            tags={tags}
            resourceNames={resourceNames}
        />
    )
}

export default ResourceList
