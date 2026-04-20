import { ResourceBuilder } from "@/content/resourceBuilder";

const makeRLAIFpipeline = new ResourceBuilder('Fine-tune large language models with reinforcement learning from human or AI feedback by Jeremy Curuksu')
.setHref('https://aws.amazon.com/blogs/machine-learning/fine-tune-large-language-models-with-reinforcement-learning-from-human-or-ai-feedback/')
.setDateOfInclusion(new Date(2026, 4, 16, 8))
.setOverview('Overview of training methods leading to example of how ot create a RLAIF pipeline.')
.setTag('training')
.setTag('coding')
.setFlashcard('RLHF', 'A method to fine-tune LLMs by collecting feedback from humans to train a reward model, which then guides the LLM to align with human preferences.')
.setFlashcard('RLAIF', 'A technique that uses feedback from AI models instead of humans to scale the development of reward models for fine-tuning LLMs.')
.setFlashcard('DPO (Direct Policy Optimization)', 'A method that refines LLM parameters directly from preference datasets, bypassing the need for an intermediate reward model.')
.setFlashcard('PPO (Proximal Policy Optimization)', 'An algorithm used in reward-based RLHF/RLAIF to explore and score new responses using a reward model.')
.setFlashcard('Constitutional AI', 'A technique where an LLM critiques and revises responses based on guiding principles to ensure they are helpful, honest, and harmless.')
.setFlashcard('Superalignment', 'Scaling the alignment of AI systems beyond direct human supervision by using AI models to assist in the alignment and supervision of other models.')
.setFlashcard('Pareto frontier', 'The optimal trade-off between competing AI behaviors, such as helpfulness and harmlessness, where improving one often comes at the cost of the other.')
.build()

export default makeRLAIFpipeline
