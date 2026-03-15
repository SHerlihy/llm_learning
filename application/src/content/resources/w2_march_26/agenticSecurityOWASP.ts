import { ResourceBuilder } from "@/content/resourceBuilder";

const agenticSecurityOWASP = new ResourceBuilder('Top 10 Agentic Security Concerns by OWASP')
.setHref('https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/')
.setOverview('Top 10 security concerns, it\'s a PDF so you have to download it.')
.setDateOfInclusion(new Date(15, 3, 2026))
.setTag('agent')
.setTag('security')
.build()

export default agenticSecurityOWASP
