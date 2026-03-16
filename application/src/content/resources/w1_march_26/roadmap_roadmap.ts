import { ResourceBuilder } from "@/content/resourceBuilder"

const roadmap_roadmap = new ResourceBuilder("AI Engineer Roadmap by roadmap.sh")
.setHref("https://roadmap.sh/ai-engineer")
.setOverview("Roadmap from web dev to ai engineer")
.setDateOfInclusion(new Date(2026, 3, 9))
.setTag("coding")
.setTag("prompting")
.build()

export default roadmap_roadmap
