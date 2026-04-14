import { ResourceBuilder } from "@/content/resourceBuilder"

const ethicsIBM = new ResourceBuilder("IBM\'s Point of View on AI Ethics by IBM")
.setHref("https://www.ibm.com/think/topics/ai-ethics")
.setDateOfInclusion(new Date(2026, 3, 9))
.setOverview("A progression through AI ethics from Academic definition to organisational implementation.")
.setTag("ethics")
.build()

export default ethicsIBM

const transcript = `
 What is AI ethics?

Ethics is a set of moral principles which help us discern between right and wrong. AI ethics is a multidisciplinary field that studies how to optimize the beneficial impact of artificial intelligence (AI) while reducing risks and adverse outcomes.

Examples of AI ethics issues include data responsibility and privacy, fairness, explainability, robustness, transparency, environmental sustainability, inclusion, moral agency, value alignment, accountability, trust, and technology misuse. This article aims to provide a comprehensive market view of AI ethics in the industry today. To learn more about IBM’s point of view, see our AI ethics page here.

With the emergence of big data, companies have increased their focus to drive automation and data-driven decision-making across their organizations. While the intention there is usually, if not always, to improve business outcomes, companies are experiencing unforeseen consequences in some of their AI applications, particularly due to poor upfront research design and biased datasets.

As instances of unfair outcomes have come to light, new guidelines have emerged, primarily from the research and data science communities, to address concerns around the ethics of AI. Leading companies in the field of AI have also taken a vested interest in shaping these guidelines, as they themselves have started to experience some of the consequences for failing to uphold ethical standards within their products. Lack of diligence in this area can result in reputational, regulatory and legal exposure, resulting in costly penalties. As with all technological advances, innovation tends to outpace government regulation in new, emerging fields. As the appropriate expertise develops within the government industry, we can expect more AI protocols for companies to follow, enabling them to avoid any infringements on human rights and civil liberties.
Establishing principles for AI ethics

While rules and protocols develop to manage the use of AI, the academic community has leveraged the Belmont Report as a means to guide ethics within experimental research and algorithmic development. There are main three principles that came out of the Belmont Report that serve as a guide for experiment and algorithm design, which are:

    Respect for Persons: This principle recognizes the autonomy of individuals and upholds an expectation for researchers to protect individuals with diminished autonomy, which could be due to a variety of circumstances such as illness, a mental disability, age restrictions. This principle primarily touches on the idea of consent. Individuals should be aware of the potential risks and benefits of any experiment that they’re a part of, and they should be able to choose to participate or withdraw at any time before and during the experiment.

    Beneficence: This principle takes a page out of healthcare ethics, where doctors take an oath to “do no harm.” This idea can be easily applied to artificial intelligence where algorithms can amplify biases around race, gender, political leanings, et cetera, despite the intention to do good and improve a given system.

    Justice: This principle deals with issues such as fairness and equality. Who should reap the benefits of experimentation and machine learning? The Belmont Report offers five ways to distribute burdens and benefits, which are by:
        Equal share
        Individual need
        Individual effort
        Societal contribution
        Merit

The latest AI trends, brought to you by experts

Primary concerns of AI today

There are a number of issues that are at the forefront of ethical conversations surrounding AI technologies in the real world. Some of these include:
Foundation models and generative AI

The release of ChatGPT in 2022 marked a true inflection point for artificial intelligence. The abilities of OpenAI’s chatbot—from writing legal briefs to debugging code—opened a new constellation of possibilities for what AI can do and how it can be applied across almost all industries.

ChatGPT and similar tools are built on foundation models, AI models that can be adapted to a wide range of downstream tasks. Foundation models are typically large-scale generative models, comprised of billions of parameters, that are trained on unlabeled data using self-supervision. This allows foundation models to quickly apply what they’ve learned in one context to another, making them highly adaptable and able to perform a wide variety of different tasks. Yet there are many potential issues and ethical concerns around foundation models that are commonly recognized in the tech industry, such as bias, generation of false content, lack of explainability, misuse and societal impact. Many of these issues are relevant to AI in general but take on new urgency in light of the power and availability of foundation models.
Technological singularity

The technological singularity is a theoretical scenario where technological growth becomes uncontrollable and irreversible, culminating in profound and unpredictable changes to human civilization. While this topic garners a lot of public attention, many researchers are not concerned with the idea of AI surpassing human intelligence in the near or immediate future.  

Strong AI (AI that would possess intelligence and self-awareness equal to those of humans) and superintelligence are still hypothetical, the ideas raise some interesting questions as we consider the use of autonomous systems, such as self-driving cars. It’s unrealistic to think that a driverless car would never get into a car accident, but who is responsible and liable under those circumstances? Should we still pursue autonomous vehicles, or do we limit the integration of this technology to create only semi-autonomous vehicles which promote safety among drivers? The jury is still out on this, but these are the types of ethical debates that are occurring as new, innovative AI technology develops.
AI impact on jobs

While a lot of public perception around artificial intelligence centers around job loss, this concern should be probably reframed. With every disruptive, new technology, we see that the market demand for specific job roles shift.

For example, when we look at the automotive industry, many manufacturers, such as GM, are shifting to focus on electric vehicle production to align with green initiatives. The energy industry isn’t going away, but the source of energy is shifting from a fuel economy to an electric one.

Artificial intelligence should be viewed in a similar manner, where artificial intelligence will shift the demand of jobs to other areas. There will need to be individuals to help manage these systems as data grows and changes every day. There will still need to be resources to address more complex problems within the industries that are most likely to be affected by job demand shifts, such as customer service. The important aspect of artificial intelligence and its effect on the job market will be helping individuals transition to these new areas of market demand.
Privacy

Privacy tends to be discussed in the context of data privacy, data protection and data security, and these concerns have allowed policymakers to make more strides here in recent years. For example, in 2016, GDPR legislation was created to protect the personal data of people in the European Union and European Economic Area, giving individuals more control of their data. In the United States, individual states are developing policies, such as the California Consumer Privacy Act (CCPA), which require businesses to inform consumers about the collection of their data.

This and other recent legislation has forced companies to rethink how they store and use personally identifiable data (PII). As a result, investments within security have become an increasing priority for businesses as they seek to eliminate any vulnerabilities and opportunities for surveillance, hacking and cyberattacks.
Bias and discrimination

Instances of bias and discrimination across a number of intelligent systems have raised many ethical questions regarding the use of artificial intelligence. How can we safeguard against bias and discrimination when the training datasets can lend itself to bias? While companies typically have well-meaning intentions around their automation efforts, there can be unforeseen consequences of incorporating AI into hiring practices. In their effort to automate and simplify a process, Amazon unintentionally biased potential job candidates by gender for open technical roles, and they ultimately had to scrap the project. As events like these surface, Harvard Business Review has raised other pointed questions around the use of AI within hiring practices, such as what data should you be able to use when evaluating a candidate for a role.

Bias and discrimination aren’t limited to the human resources function either; it can be found in a number of applications from facial recognition software to social media algorithms.

As businesses become more aware of the risks with AI, they’ve also become more active this discussion around AI ethics and values. For example, last year IBM’s CEO Arvind Krishna shared that IBM has sunset its general purpose IBM facial recognition and analysis products, emphasizing that “IBM firmly opposes and will not condone uses of any technology, including facial recognition technology offered by other vendors, for mass surveillance, racial profiling, violations of basic human rights and freedoms, or any purpose which is not consistent with our values and Principles of Trust and Transparency.”
Accountability

There is no universal, overarching legislation that regulates AI practices, but many countries and states are working to develop and implement them locally. Some pieces of AI regulation are in place today, with many more forthcoming. To fill the gap, ethical frameworks have emerged as part of a collaboration between ethicists and researchers to govern the construction and distribution of AI models within society. However, at the moment, these only serve to guide, and research shows that the combination of distributed responsibility and lack of foresight into potential consequences isn’t necessarily conducive to preventing harm to society.
AI Academy
Uniting security and governance for the future of AI

While grounding the conversation in today’s newest trend, agentic AI, this AI Academy episode explores the tug-of-war that risk and assurance leaders experience between governance and security. It’s critical to establish a balance and prioritize a working relationship for both to achieve better, more trustworthy data and AI your organization can scale.
Go to episode
How to establish AI ethics

Artificial intelligence performs according to how it is designed, developed, trained, tuned, and used, and AI ethics is all about establishing an ecosystem of ethical standards and guardrails around throughout all phases of an AI system’s lifecycle.

Organizations, governments and researchers alike have started to assemble frameworks to address current AI ethical concerns and shape the future of work within the field. While more structure is injected into these guidelines every day, there is some consensus around incorporating the following:
Governance

Governance is an organization’s act of overseeing the AI lifecycle through internal policies and processes, staff and systems. Governance helps to ensure that AI systems are operating as an organization’s principles and values intend, as stakeholders expect, and as required by relevant regulation. A successful governance program will:

    define the roles and responsibilities of people working with AI.

    educate all people involved in the AI lifecycle about building AI in a responsible way.

    establish processes for building, managing, monitoring and communicating about AI and AI risks.

    leverage tools to improve AI’s performance and trustworthiness throughout the AI lifecycle.

An AI Ethics Board is a particularly effective governance mechanism. At IBM, the AI Ethics Board, now named the IBM Responsible Technology Board, is comprised of diverse leaders from across the business. It provides a centralized governance, review, and decision-making process for IBM ethics policies and practices. Learn more about the IBM Responsible Technology Board.
Principles and focus areas

An organization’s approach to AI ethics can be guided by principles that can be applied to products, policies, processes and practices throughout the organization to help enable trustworthy AI. These principles should be structured around and supported by focus areas, such as explainability or fairness, around which standards can be developed and practices can be aligned.

When AI is built with ethics at the core, it is capable of tremendous potential to impact society for good. We’ve started to see this in its integration into areas of healthcare, such as radiology. The conversation around AI ethics is also important to appropriately assess and mitigate possible risks related to AI’s uses, beginning the design phase.
Organizations that promote AI ethics

Since ethical standards are not the primary concern of data engineers and data scientists in the private sector, a number of organizations have emerged to promote ethical conduct in the field of artificial intelligence. For those seeking more information, the following organizations and projects provide resources for enacting AI ethics:

    AlgorithmWatch: This nonprofit focuses on an explainable and traceable algorithm and decision process in AI programs. Click here to learn more.

    AI Now Institute: This nonprofit at New York University researches the social implications of artificial intelligence. Click here to learn more.

    DARPA: The Defense Advanced Research Projects Agency by the US Department of Defense focuses on promoting explainable AI and AI research.

    CHAI: The Center for Human-Compatible Artificial Intelligence is a cooperation of various institutes and universities to promote trustworthy AI and provable beneficial systems.

    NASCAI: The National Security Commission on Artificial Intelligence is an independent commission “that considers the methods and means necessary to advance the development of artificial intelligence, machine learning and associated technologies to comprehensively address the national security and defense needs of the United States.”

IBM’s point of view on AI Ethics

IBM has also established its own point of view on AI ethics, creating Principles of Trust and Transparency to help clients understand where its values lie within the conversation around AI. IBM has three core principles that dictate its approach to data and AI development, which are:

    The purpose of AI is to augment human intelligence. This means that we do not seek to replace human intelligence with AI, but support it. Since every new technological innovation involves changes to the supply and demand of particular job roles, IBM is committed to supporting workers in this transition by investing in global initiatives to promote skills training around this technology.

    Data and insights belong to their creator. IBM clients can rest assured that they, and they alone, own their data. IBM has not and will not provide government access to client data for any surveillance programs, and it remains committed to protecting the privacy of its clients.

    AI systems must be transparent and explainable. IBM believes that technology companies need to be clear about who trains their AI systems, what data was used in that training and, most importantly, what went into their algorithms’ recommendations.

IBM has also developed five pillars to guide the responsible adoption of AI technologies. These include:

    Explainability: An AI system should be transparent, particularly about what went into its algorithm’s recommendations, as relevant to a variety of stakeholders with a variety of objectives.

    Fairness: This refers to the equitable treatment of individuals, or groups of individuals, by an AI system. When properly calibrated, AI can assist humans in making fairer choices, countering human biases and promoting inclusivity.

    Robustness: AI-powered systems must be actively defended from adversarial attacks, minimizing security risks and enabling confidence in system outcomes.

    Transparency: To reinforce trust, users must be able to see how the service works, evaluate its functionality, and comprehend its strengths and limitations.

    Privacy: AI systems must prioritize and safeguard consumers’ privacy and data rights and provide explicit assurances to users about how their personal data will be used and protected.

These principles and focus areas form the foundation of our approach to AI ethics. To learn more about IBM’s views around ethics and artificial intelligence, read more here.
`
