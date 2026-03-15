import { ResourceBuilder } from "@/content/resourceBuilder";

const introToAgentsGoogle = new ResourceBuilder('Intro to Agentic AI by Google')
.setHref('https://cloud.google.com/discover/what-is-agentic-ai')
.setDateOfInclusion(new Date(15, 3, 2026))
.setOverview('The Google definition of what agentic AI is.')
.setTag('agent')
.setTag('chill')
.build()

export default introToAgentsGoogle
