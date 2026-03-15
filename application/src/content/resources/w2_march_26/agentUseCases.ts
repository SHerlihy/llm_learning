import { ResourceBuilder } from "@/content/resourceBuilder";

const agentUseCases = new ResourceBuilder('Agent use Cases in Industry by Google')
.setHref('https://cloud.google.com/transform/101-real-world-generative-ai-use-cases-from-industry-leaders')
.setOverview('Agentic solutions being developed and used by companies to provide business solutions.')
.setDateOfInclusion(new Date(2026, 3, 15))
.setTag('agent')
.setTag('chill')
.build()

export default agentUseCases
