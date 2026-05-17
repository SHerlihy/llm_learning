import { ResourceBuilder } from "@/content/resourceBuilder";

const adapterLayerTuning = new ResourceBuilder('Adapter Layers: Bottleneck Modules for Efficient Fine-Tuning by Michael Brenndoerfer')
.setHref('https://mbrenndoerfer.com/writing/adapter-layers-bottleneck-modules-transformer-fine-tuning')
.setDateOfInclusion(new Date(2026, 5, 17, 12))
.setOverview('From high level to detailed technical explaination of how fine tuning an LLM using adapter layers works.')
.setTag('training')
.build()

export default adapterLayerTuning
