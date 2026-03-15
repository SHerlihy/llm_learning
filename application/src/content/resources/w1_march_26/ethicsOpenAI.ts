import { ResourceBuilder } from "@/content/resourceBuilder"

const ethicsOpenAI = new ResourceBuilder("Open AI Ethical Concerns")
.setHref("https://openai.com/safety/")
.setOverview("Overview of ethical considerations Open AI have prioritised.")
.setDateOfInclusion(new Date(3, 9, 2026))
.setTag("chill")
.setTag("ethics")
.build()

export default ethicsOpenAI
