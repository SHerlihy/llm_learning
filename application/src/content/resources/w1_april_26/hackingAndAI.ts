import { ResourceBuilder } from "@/content/resourceBuilder";

const hackingAndAI = new ResourceBuilder('Black-hat LLMs by Nicholas Carlini')
.setHref('https://youtu.be/1sd26pWhfmg?si=jTI4A-XmUlqbbS5P')
.setDateOfInclusion(new Date(2026, 4, 6, 11))
.setOverview('Talk detailing hacking capabilities of LLMs as of March 2026.')
.setTag('security')
.setFlashcard('Black hat language models', 'Researching how language models can be used to cause harm in order to develop better defenses.')
.setFlashcard('SQL injection', 'A security vulnerability where user input is improperly concatenated into SQL queries, allowing attackers to manipulate the database.')
.setFlashcard('Blind SQL injection', 'A type of SQL injection where an attacker cannot see the direct output of their query and must infer data by observing side effects like response time or crashes.')
.setFlashcard('Smart contracts', 'Programs stored on a blockchain that represent financial value; recent models have shown the ability to identify and exploit vulnerabilities in them to recover millions of dollars.')
.setFlashcard('Scaffold', 'The framework or set of instructions used to run a language model to perform a specific task, such as finding vulnerabilities in a virtual machine.')
.setFlashcard('Base capability', 'The inherent ability of an AI model to perform tasks without specialized, complex scaffolding or external tools like fuzzing harnesses.')
.setFlashcard('Heap buffer overflow', 'A type of security vulnerability where a program writes more data to a heap-allocated memory block than it can hold; the AI found remotely exploitable instances of this in the Linux kernel.')
.setFlashcard('Fuzzing', 'An automated software testing technique that involves providing invalid, unexpected, or random data as inputs; the author notes that certain complex logic bugs found by AI would likely never be found by traditional fuzzing.')
.setFlashcard('Post-quantum cryptography', 'Developing cryptographic systems secure against future quantum computers; used as an analogy for defending against AI threats before they are fully realized.')
.setFlashcard('IEA (International Energy Agency) Solar Predictions', 'A cautionary example of experts consistently underestimating exponential growth (like AI capability) by predicting linear trends.')
.build()

export default hackingAndAI
