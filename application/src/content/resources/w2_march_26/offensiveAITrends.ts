import { ResourceBuilder } from "@/content/resourceBuilder";

const offensiveAITrends = new ResourceBuilder('Offensive AI Trends by Google')
.setHref('https://cloud.google.com/security/resources/ai-risk-and-resilience')
.setDateOfInclusion(new Date(15, 3, 2026))
.setOverview('2025 account of how AI is being used offensively and how Google mitigates these risks.')
.setTag('security')
.setTag('prompting')
.setTag('agent')
.build()

export default offensiveAITrends
