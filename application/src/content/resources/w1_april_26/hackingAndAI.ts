import { ResourceBuilder } from "@/content/resourceBuilder";

const hackingAndAI = new ResourceBuilder('Black-hat LLMs by Nicholas Carlini')
.setHref('https://youtu.be/1sd26pWhfmg?si=jTI4A-XmUlqbbS5P')
.setDateOfInclusion(new Date(2026, 4, 6, 11))
.setOverview('Talk detailing hacking capabilities of LLMs as of March 2026.')
.setTag('security')
.build()

export default hackingAndAI
