import { ResourceBuilder } from "@/content/resourceBuilder"

const ethicsIBM = new ResourceBuilder("IBM\'s Point of View on AI Ethics by IBM")
.setHref("https://www.ibm.com/think/topics/ai-ethics")
.setDateOfInclusion(new Date(2026, 3, 9))
.setOverview("A progression through AI ethics from Academic definition to organisational implementation.")
.setTag("ethics")
.build()

export default ethicsIBM
