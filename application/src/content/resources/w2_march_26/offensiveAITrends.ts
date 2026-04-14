import { ResourceBuilder } from "@/content/resourceBuilder";

const offensiveAITrends = new ResourceBuilder('Offensive AI Trends by Google')
.setHref('https://cloud.google.com/security/resources/ai-risk-and-resilience')
.setDateOfInclusion(new Date(2026, 3, 15))
.setOverview('2025 account of how AI is being used offensively and how Google mitigates these risks.')
.setTag('security')
.setTag('prompting')
.setTag('agent')
.build()

export default offensiveAITrends

const transcript = `
Introduction

In 2025, the cybersecurity landscape shifted as threat actors moved from experimental use of AI to full operationalization. Adversaries have moved beyond the simple use of large language models to draft phishing content and are now deploying adaptive tools capable of rewriting code, and using AI agents that navigate systems with minimal human oversight. These capabilities have fundamentally changed the speed and scale of attacks, marking a distinct evolution that demands a shift in defensive strategy.

Simultaneously, the race to implement AI has exposed risk areas that often outpace security controls. The most pressing challenges are rarely novel “AI-specific“ attacks like model theft, but rather foundational gaps in governance and IT hygiene. The proliferation of “Shadow AI“—tools deployed without oversight—and a lack of AI asset visibility remain critical friction points, requiring a renewed focus on securing the implementation of AI applications and tools rather than just the models themselves. To truly secure this expanding surface, organizations must build robust governance for AI usage—helping to address the shadow AI challenge—and embrace regular AI red teaming, actively stress-testing their systems to identify vulnerabilities before they can be exploited.

At the same time, the rise of agentic AI is also empowering security teams. AI has proven to be a capable force multiplier for security operations, offering clear benefits by accelerating investigations and analysis. Navigating the year ahead will require using AI-powered security tools to stay ahead of AI-enabled threats, closing gaps and vulnerabilities through testing and validation, and ensuring that teams feel confident in their ability to respond.
Adversarial use of AI

Adversarial use of AI

In early 2025, Google Threat Intelligence Group (GTIG) observed threat actors use generative AI primarily as a productivity multiplier—a tool for “vibe coding,“ drafting multilingual phishing lures, and supporting different phases of the attack lifecycle, as detailed in GTIG’s January 2025 analysis, Adversarial Misuse of Generative AI. This analysis showed state-sponsored groups—including those linked to the People’s Republic of China (PRC), Russia, North Korea, and Iran—experimenting with large language models (LLMs) such as Gemini to troubleshoot code, research vulnerabilities, and develop tools; however, they were largely unsuccessful in bypassing safety guardrails or achieving novel offensive capabilities.

The critical evolution over the subsequent months was the move away from primarily static, human-in-the-loop use to the incorporation of highly autonomous and adaptive attacks. By the end of 2025, threat actors were integrating LLM APIs directly into malware for “just-in-time“ code generation, creating potentially newer classes of threats that are exponentially harder to detect and attribute.

An example of this technical shift was the emergence of adaptive malware. Malware families such as PROMPTFLUX and PROMPTSTEAL use LLM APIs to generate malicious code or commands on demand during execution. This runtime capability allows the malware to be polymorphic, constantly altering its signature and behavior to evade traditional, signature-based detection systems. The LLM acts as an external C2, providing “goal-driven“ guidance to the malware based on the environment it finds itself in, a capability unattainable with traditional hard-coded logic.

Timeline of notable adversarial advances in 2025

Early 2025: Augmentation and experimentation

In the first half of the year, threat actors focused on lifting the floor of capability for offensive operations. Threat actors used AI to accelerate manual tasks, while lower-skilled actors used it to bridge technical gaps.

    Basic use cases documented: In January, GTIG observed state-sponsored actors (PRC, Iran, Russia, North Korea) using LLMs for “vibe coding“—generating non-malicious code snippets for later assembly. No novel offensive capabilities were detected, and instead AI was primarily used for translation, reconnaissance, and attack lifecycle support.
    Information operations (IO) activity: GTIG identified Iranian IO actors as the heaviest users of Gemini (75% of IO use), using it for persona development, messaging, and translation to increase their reach.
    Failed jailbreaks: GTIG recorded threat actors unsuccessfully attempting to use publicly available jailbreak prompts to generate ransomware code or bypass Google’s account verification methods.

Mid-2025: Operationalization and integration

The mid-year marked a shift from using AI to integrating AI. Actors began connecting LLM APIs directly into their attack chains to handle dynamic tasks like social engineering and initial access.

    Discovery of PROMPTFLUX: In June, GTIG identified an experimental VBScript dropper malware that uses the Gemini API to facilitate “just-in-time“ self-modification. The malware queries the LLM to rewrite its own source code on an hourly basis to evade detection.
    Discovery of PROMPTSTEAL: GTIG identified the Russian government-backed actor APT28 (FROZENLAKE) using new malware against Ukraine. This tool queries an LLM to generate one-line Windows commands for document theft, marking the first observation of malware querying an LLM deployed in live operations.
    Social engineering safeguards: Throughout August, GTIG observed a PRC-nexus actor masquerading online as a “Capture-the-Flag“ (CTF) participant to trick Gemini into providing exploitation advice for specific software and email services.

Late 2025: Autonomous agents and native AI threats

The final quarter introduced more advanced evolutions: emerging interest in agentic AI capabilities and the commercialization of AI-enabled attack tools.

    AI-native operations and malware: In November, GTIG confirmed the transition of malware from productivity gains to active deployment. Tools like FRUITSHELL (PowerShell reverse shell) and QUIETVAULT (credential stealer) were observed in operations using AI to search for and exfiltrate secrets.
    Expanding attack surfaces: GTIG observed a suspected PRC-nexus actor using Gemini to research unfamiliar attack surfaces, including Kubernetes and vSphere, seeking help with container enumeration and macOS host permissions.
    North Korean crypto operations: GTIG identified the North Korean actor UNC1069 (MASAN) using Gemini to research cryptocurrency concepts and perform reconnaissance on wallet application data to support regime-backed financial theft.
    Maturing marketplace: GTIG identified a matured underground marketplace for illicit AI tools. Multiple offerings now exist to support phishing, malware development, and vulnerability research, effectively lowering the barrier for less sophisticated actors.

The evolution of the AI threat landscape in 2025 transformed the nature of cyber offense. What began as low-level augmentation in January escalated by November into AI-orchestrated espionage and LLM-enabled adaptive malware. The reported use of tools like PROMPTSTEAL and FRUITSHELL in live operations solidified the concept of AI as a core component of the modern attack chain. Defenders are now faced with a threat ecosystem where attacks are scalable, code is dynamically obfuscated, and legitimate generative AI tools are being used to accelerate malicious operations. This paradigm shift mandates a move away from static security controls toward behavioral analytics, API-level monitoring, and the development of defensive AI models capable of countering the intelligence and agency of adversarial AI.
Securing AI systems

Securing AI systems

Attackers were not the only ones making great strides using AI. Enterprises continued to integrate AI into their operations and empower defenders with AI-enabled solutions. Over the last 12 months, Mandiant conducted numerous AI system assessments, AI threat modeling exercises, and detection workshops globally. Some trends have begun to emerge from these engagements.

Organizations generally fall into three categories of AI use:

    Consumers: Organizations that strictly use third-party LLMs as-is
    Integrators: Organizations that use multiple components within their AI deployment, such as Retrieval-Augmented Generation (RAG) and Model Context Protocol (MCP) servers, which can increase the complexity of the overall system
    Trainers: Organizations that are actively training models and developing autonomous agents

Currently, Mandiant sees the majority of organizations in the “Consumers“ and “Integrators“ buckets. However, the number of organizations in the “Trainers“ category is gradually increasing.

Despite these differing levels of complexity, one theme remained constant across Mandiant’s engagements: security challenges that existed in previous eras of IT innovation are still present–what is old is new again.

Encouragingly, Mandiant found that when organizations establish foundational governance and conduct regular threat modeling, they move beyond basic protection to substantially improved risk visibility. This proactive stance allows teams to identify risks that can’t be eliminated due to current technical or procedural limitations. By identifying these constraints, they enable leadership to either accept the risk or prioritize the development of necessary compensating controls.

The infrastructure gap: Basic hygiene is missing

One of the most consistent findings was that organizations are encountering similar security challenges in their AI pipelines as they do in their overall infrastructure security.

During recent assessments, Mandiant found that foundational security hygiene elements were frequently absent from AI initiatives. These challenges fall into four key categories:

    Asset management: Application registries and configuration management databases or files that clarify the relationships between the hardware, software, and networks used by an organization (CMDBs) generally don’t exist.
    Supply chain visibility: AI Software Bill of Materials (SBOMs) don’t exist, are not being maintained, or are not required of developers.
    Vulnerability management: Standard security scanners often lack visibility into AI-specific artifacts, leaving the underlying frameworks and containerized environments unmonitored for known exploits. AI security is dependent on the security posture of the environment within which AI applications are hosted. Therefore it is critical to detect and mitigate impactful environmental vulnerabilities and remediate them.
    Identity management: AI heavily relies on resource-level permissions, and LLMs are rapidly exposing historical access flaws by making internal data easily searchable. This allows users to discover and modify sensitive files they shouldn’t have access to. Mandiant found that organizations, eager to deploy AI tools, often overlook technical validation and AI threat modeling, or they push it off for later.

The governance gap: Shadow AI

To secure the landscape, organizations must distinguish between Governance of AI and Governance for AI. The former focuses on the technical artifacts–ensuring models are fair, safe, secure, and performant. The latter focuses on the organization’s framework–defining the policies, procurement channels, and approval workflows for how AI is adopted by the business. While security teams may focus on monitoring and assessing the AI-enabled application (“Of“), they often lack the mandate to manage how the broader business procures and adopts these tools or the technical capabilities (“For“).

Mandiant observed critical blind spots in AI pipelines, where some business units operate with “carte blanche“ and deploy AI applications and tools in an ad hoc manner without IT vetting. In these cases, infrastructure and security teams often have limited ability to curtail risky actions.

This disconnect creates a fertile ground for shadow AI: instances where unsanctioned AI tools and applications are deployed without oversight, bypassing standard security reviews, and leaving the organization blind to the risks being introduced.

AI threat modeling: Perceived versus actual risk

While performing AI threat modeling for clients, Mandiant often observed a disconnect between perceived and actual threats. For example, Mandiant found that security leaders often prioritized complex, theoretical risks, while the real vulnerabilities stemmed from basic implementation flaws.

In one example involving an API-based application that used calls to an external LLM platform, the organization’s leadership was concerned about model theft and training data poisoning. They tasked the security team with developing mitigations for these specific risks. However, the reality was different. Because the application relied on an external API, there was no model to be stolen and no training data to be poisoned within the environment.

In contrast, actual vulnerabilities were often product design flaws. In one instance, a security deficiency was identified where developers were caching AI chatbot history directly in the browser history. As a result, data theft and data poisoning could occur from the user endpoint, without requiring a compromise of the backend infrastructure.


Detection and response: The starting line

Mandiant noticed common trends across multiple workshops and detection development engagements. Security teams simply did not know where to start with AI security. Often they lacked a fundamental understanding of AI components and the specific behaviors to monitor.

Security teams must extend their scope to understand how agentic applications are granted access to data and how they integrate into enterprise tools, especially through Model Context Protocol (MCP) servers. Teams need to ground their strategy in the organization’s specific use cases. Without this context, teams often burn cycles on theoretical, perceived risks rather than the reality of the threat facing their specific architecture.

Furthermore, relying on static signatures is insufficient for these dynamic environments. Mandiant advises teams to shift from Indicators of Compromise (IOCs) to Indicators of Activity (IOAs)-looking for anomalies in behavior rather than known bad file hashes. To achieve this, security teams must request specific telemetry from developers, such as:

    Tool execution sequences: Monitoring for illogical chains of tool use (such as, an agent accessing a database followed immediately by an external API call)
    Token usage anomalies: Alerting on sudden spikes in input/output ratios which may indicate a prompt injection or denial-of-service attempt

By mapping these behaviors to actual use cases, security teams can move from perceived to reality-based detection.

Insights from Mandiant red teaming for AI

The integration of AI into applications can expose a new attack surface. The traditional approach to securing an application, which while still a critical requirement, is no longer sufficient as it now includes the security of the data, the agent’s instructions, and the tools it is permitted to access.

Mandiant Red Teaming for AI assessments have repeatedly shown that some AI components without appropriate guardrails, controls, and hardening can be manipulated to turn a system’s intended function against itself. For organizations deploying AI applications, these types of assessments are critical to test how the AI implementation affects the security of the data and business processes that the application serves. Proactive, regular offensive security testing can validate defenses against emerging, relevant threats, and provides the highest level of assurance for the security of assets in the age of AI.

Throughout 2025, offensive security assessments performed by Mandiant Consulting targeted a diverse array of AI-enabled applications globally and across industries based on the needs of clients. The kinds of applications tested included:

    Customer-facing AI: Systems like retail chatbots and sentiment analysis systems designed to categorize customer emails
    Enterprise SaaS solutions: SaaS applications used for core business operations, such as project management and invoicing/business operations platforms, as well as a complex internal MCP Server
    Agentic workflows: Complex systems where AI agents use internal agentic tools and have access to sensitive resources, such as those used for querying and answering questions about service tickets

This work has been critical in helping organizations understand how AI applications can introduce novel risks–whether it’s what agents can do, how the attack surface changes, or where sensitive data might be exposed.

New AI-specific vulnerability categories

Mandiant uncovered a mix of attack vectors specific to AI applications, alongside traditional vulnerabilities that manifest in new ways within the context of AI.

Prompt injection subverting AI trust

Prompt Injection remains a premier attack vector. During red team assessments, Mandiant executed advanced techniques to exploit AI’s ability to process and act on prompts and other inputs–even when these inputs are hidden–which could be an indication that the application lacks defense-in-depth including the screening of prompts and responses. In one example, the team successfully performed a prompt injection using text embedded within an image file. The image was rendered at one-by-one pixel dimensions, making it effectively invisible to a human user but still parsed and executed by the AI model.

Traditional vulnerabilities amplified in AI workflows

Common application security flaws can have amplified consequences when tied to AI functionality.

    Persistent malicious prompts: A persistent, malicious prompt was created in a target’s application user profile through an access permission vulnerability by changing the user ID. The prompt successfully directed the AI agent to email private data to the red team every time the target logged into the application.
    SQL injection through AI application interface: In multiple cases, AI application interfaces such as a chatbot order number lookup exposed a SQL Injection (SQLi) vulnerability, allowing Mandiant to retrieve records from the order management system.
    Log-Based SSRF attacks: The team introduced an XSS (cross-site scripting) payload into a customer’s AI chatbot. While the chatbot properly sanitized the input for a normal chat response, asking the chatbot to summarize the application log caused it to load the raw attack payload into a headless browser, which is a browser that runs from a command line to process HTML, Javascript, or other documents. This Server-Side Request Forgery (SSRF) granted the team unauthorized access to other cloud resources used by the application.

AI agent design and implementation issues exposing information

Because AI agents are designed to access internal tools, they introduce new risks for reconnaissance. Mandiant’s offensive security team observed multiple examples of these risks during engagements.

    Internal reconnaissance: In one engagement, the Mandiant team asked an AI agent to provide a detailed list of its internal capabilities, tools, scripts, or APIs. This simple interaction, if not prevented using guardrails or other methods, can enable a threat actor to fully map the agent’s attack surface without ever probing for a vulnerability. While exposing capabilities may be required for an agent, it also could enable an attacker to gain sensitive information.
    Tool-induced data theft: The team identified a SSRF vulnerability within an agentic tool that was invoked by a generative AI chatbot to perform an external task. Exploiting this flaw allowed Mandiant to recover the Cloud SaaS integration API key, which the agent used to query sensitive service ticket information.
    Excessive Agency: In several assessments, the team was able to cause an AI agent to access information or perform tasks that should not have been able to occur. For example, the team was able to access data that should have required a corporate device to access policies.

During these engagements, Mandiant red team experts worked with customers globally to validate the defenses protecting their AI systems. By emulating real-world attacks informed by Google’s own internal research, Mandiant tested controls, mapped the attack surface, and ensured customers can identify and address security gaps specifically related to AI systems.

In today’s landscape, security testing and validation is a business imperative.

AI-powered defense

AI-powered defense

Over the last year, Mandiant consultants have observed a significant shift in how organizations use AI, including large language models such as Gemini, in daily cyber defense and security operations. AI is no longer just a topic of conversation; it is shifting from experimentation into operations and has a security presence in the environments that we assess and defend. Mandiant has observed firsthand AI’s rapid transition into practical application, with specific cyber defense use cases gaining traction in organizations over the past 12 months.

Retrospective incident analysis

Mandiant has seen organizations using AI to conduct retrospective analysis on incident ticket backlogs. Rather than treating every alert as an isolated event, security operations center (SOC) teams are now tasking AI to review the last 30+ days of closed incident tickets to identify patterns that a human analyst, buried in the daily queue, could miss. Once this data is ingested, analysts are prompting AI to look for subtle commonalities that indicate deeper architectural and endpoint issues.

Mandiant sees analysts asking specific, high-level questions such as, “Based on the root causes of these 500 incidents, what specific security control is most frequently failing or missing?“ or “Group these incidents by initial access vector and recommend three prioritized engineering projects to reduce next month's volume.“ The AI model can identify those seemingly dissimilar alerts, such as a mix of account lockouts and suspicious PowerShell executions, that are actually related to the same underlying misconfiguration or a missing patch. By using AI in this way, SOCs are effectively turning a month’s worth of reactive tickets into a proactive roadmap for hardening their environment.

AI as a translation layer

Mandiant experts are noticing a shift in how SOCs interact with endpoint telemetry where integrated AI acts as a translation layer between human questions and complex EDR query languages. Traditionally, determining file prevalence required an analyst to master specific query syntax, like SPL or KQL, to construct a search across thousands of endpoints. Now, they are simply inputting natural language prompts like “Show me how prevalent this malicious file is in our network,“ and AI instantly generates and executes the necessary query. This allows analysts to focus on the investigative question rather than the technical constraints of the tool, effectively lowering the barrier to entry for complex threat hunting and allowing junior analysts to perform searches that previously required senior engineering support.

When creating documentation for SOC analysts, Mandiant is seeing an evolution where playbooks are pivoting from technical “how-to“ guides into repositories of “prompts“ designed to bridge the skill gap in coding. Traditionally, using Jupyter Notebooks for advanced threat hunting required a working knowledge of Python and libraries, like Pandas, effectively gating these powerful tools behind a programming barrier. To solve this, senior security analysts are now codifying the specific natural language prompts required to generate functional code into their standard operating playbooks.

Instead of listing Python syntax, the playbook instructs the analyst on what to ask AI. For example, providing a standardized prompt structure to “ingest this CSV, clean the timestamp column, and visualize login anomalies by geo-location“ allows analysts with little to no coding experience to execute complex data analysis simply by copy-pasting the prompt. This approach effectively turns the AI model into a translator for the SOC but it requires rigorous standardization to ensure reliability. This way, it reduces the risk of hallucinations or logic errors in the generated code and allows the entire team to operate at the level of senior threat hunters.

Threat hunting advancements

When threat hunting, hunters often construct complex queries involving intricate regular expressions or specific filtering logic to sift through terabytes of log data. Mandiant has seen SOCs use AI to quality check this code before execution if AI assistance is not built-in, such as asking an AI model to validate that a KQL or SPL query is structurally efficient and logically sound. AI checks for common errors that might inadvertently exclude relevant data, such as overly aggressive allowlisting or timezone mismatches. By treating AI as a second pair of eyes, hunters are reducing the risk caused by human error in the query creation phase, ensuring that the search string is not broken.

Beyond validating code, AI is also proving to be invaluable in identifying conceptual gaps in the hunt hypothesis itself. Sophisticated hunters are using AI to broaden the scope of their investigations by asking, for example, “Given that I am hunting for lateral movement using WMI, what other adjacent behavioral indicators or distinct log sources am I overlooking?“ The model can cross-reference the hunter’s current scope against frameworks like MITRE ATT&CK to highlight missing coverage or suggest variations of the technique that the hunter may not have considered. This turns the hunt from a static search for known indicators into a dynamic brainstorming session where AI prompts the human analyst to look for the subtle anomalies or missing logs that often accompany the primary attack vector.

Forensic analysis acceleration

In the high-pressure environment of incident response, AI has become an indispensable tool for accelerating the tedious process of forensic timelining. Traditionally, analysts spent time manually normalizing timestamps across different systems, converting UTC server logs to match local workstation events and cross-referencing firewall traffic. AI-driven tools now ingest these raw streams of telemetry from SIEM and EDR platforms to instantly construct a coherent, chronological narrative of the attack. By identifying relationships between seemingly unrelated events, such as linking a specific PowerShell execution to a suspicious login occurring seconds prior, AI presents the analyst with a pre-assembled “story“ of the compromise. This allows the responder to focus on analyzing the implications of the timeline rather than wasting time on data entry and formatting.

Technical and executive report generation

Once the immediate threat is contained, Mandiant has observed that analysts are using AI to streamline the documentation phase, transforming raw forensic artifacts and notes into polished, structured deliverables. The adoption of these tools is driven not just by efficiency, but by a surprising improvement in output quality as readers are starting to prefer AI-written reports over human-written ones. This preference stems from AI’s ability to convert messy data into coherent narratives without the fatigue that affects human responders after an incident. A key strength of these models is their ability to focus-shift based on the audience, generating “Executive Summaries“ for the C-Suite while simultaneously drafting highly technical documents for security engineering teams in a matter of seconds, ensuring clear communication across the organization.

The agentic SOC evolution

Looking ahead, the shift from simple AI chatbots to a system of interconnected agents will enable organizations to evolve towards an agentic security operations center (SOC). In the agentic SOC, agents reason through and execute tasks dynamically to achieve specific goals, as well as automate complex workflows, enabling analysts to prioritize strategic challenges and investigations that require human expertise. Within Google Threat Intelligence, for example, agents enabled by Gemini can reverse-engineer files to identify malware and hunt for new threats. Similarly, in Google Security Operations, Gemini agents perform dynamic alert triage and investigations by autonomously gathering context and rendering verdicts. Throughout these processes, humans remain in the loop with access to transparent audit logs detailing the agent's evidence, reasoning, and decision-making.

Conclusion

As adversaries scale their operations with adaptive malware and autonomous agents, the margin for error in our own environments has narrowed. Yet, the greatest risks don’t always stem from external threats, but from internal gaps in AI system integrity, where shadow AI and unchecked implementation create silent vulnerabilities.

Mitigating these internal risks does not mean stifling innovation. Recent research from the Cloud Security Alliance and Google Cloud confirms that comprehensive governance acts as a maturity multiplier. Organizations with clear guidelines are nearly twice as likely to adopt advanced agentic AI and effectively train their staff. When teams operate within established guardrails, they innovate with confidence and speed, effectively reducing the incentive for shadow AI.

To build on this foundation and strengthen their security posture, organizations must adopt a strategy of active validation and operational readiness. This means moving beyond passive governance to continual red teaming, stress-testing models and agents to expose flaws before they can be exploited. Simultaneously, we must fully embrace AI-powered defense, using the speed and analytical power of emerging tools to better detect and respond to threats.

In cybersecurity, complexity is inevitable. We can’t predict every technological and threat evolution, but by turning awareness and visibility into action, we stand to close the gap between adversaries and defenders.
`
