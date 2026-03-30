import { ResourceBuilder } from "@/content/resourceBuilder";

const awsPromptCaching = new ResourceBuilder('Prompt caching for faster model inference by AWS')
.setHref('https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html')
.setDateOfInclusion(new Date(2026, 3, 30, 8))
.setTag('cost')
.setTag('coding')
.setTag('prompting')
.build()

export default awsPromptCaching
