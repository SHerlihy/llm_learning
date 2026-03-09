import { ResourceBuilder } from "../resourceBuilder";

const roadmap_roadmap = new ResourceBuilder("AI Engineer Roadmap by roadmap.sh")
.setHref("https://roadmap.sh/ai-engineer")
.setOverview("Roadmap from web dev to ai engineer")
.setDateOfInclusion(new Date(9, 3, 2026))
.setTag("coding")
.setTag("prompting")
.build()

export default roadmap_roadmap
