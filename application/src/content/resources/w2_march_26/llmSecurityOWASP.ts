import { ResourceBuilder } from "@/content/resourceBuilder";

const llmSecurityOWASP = new ResourceBuilder('Top 10 LLM Security Concerns by OWASP')
.setHref('https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/')
.setOverview('Top 10 security concerns, it\'s a PDF so you have to download it.')
.setDateOfInclusion(new Date(2026, 3, 15))
.setTag('security')
.build()

export default llmSecurityOWASP
