import { ResourceBuilder } from "@/content/resourceBuilder";

const makeRLAIFpipeline = new ResourceBuilder('Fine-tune large language models with reinforcement learning from human or AI feedback by Jeremy Curuksu')
.setHref('https://aws.amazon.com/blogs/machine-learning/fine-tune-large-language-models-with-reinforcement-learning-from-human-or-ai-feedback/')
.setDateOfInclusion(new Date(2026, 4, 16, 8))
.setOverview('Overview of training methods leading to example of how ot create a RLAIF pipeline.')
.setTag('training')
.setTag('coding')
.build()

export default makeRLAIFpipeline
