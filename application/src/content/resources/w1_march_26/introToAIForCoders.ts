import { ResourceBuilder } from "@/content/resourceBuilder"

const introToAIForCoders = new ResourceBuilder("Enterprise AI Tutorial – Embeddings, RAG, and Multimodal Agents Using Amazon Nova and Bedrock by Auman Debnath")
.setHref("https://youtu.be/HaUe2AN210g?si=SXu6H8Bv5EhhcL8Z")
.setOverview("A light introduction to the software required for LLMs and mutli-modal LLMs to function.")
.setDateOfInclusion(new Date(2026, 3, 9))
.setFlashcard("inference", "a conclusion reached on the basis of evidence and reasoning.")
.setFlashcard("BERT", "a bidirectional model designed to understand the deep context of words by reading entire sentences in both directions simultaneously.")
.setFlashcard("GPT", "a unidirectional model designed to generate coherent, human-like text by predicting the next word in a sequence based on the context of preceding words.")
.setTag("coding")
.build()

export default introToAIForCoders
