import { ResourceBuilder } from "@/content/resourceBuilder";

const howLoRA = new ResourceBuilder('Low-rank adaptation fine tuning by IBM')
.setHref('https://www.ibm.com/docs/en/watsonx/w-and-w/2.3.x?topic=methods-lora-fine-tuning')
.setOverview('A technical overview of how LoRA fine tuning works.')
.setDateOfInclusion(new Date(2026, 5, 17, 11))
.setTag('training')
.build()

export default howLoRA
