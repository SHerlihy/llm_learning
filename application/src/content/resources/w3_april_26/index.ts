import { Resource } from "@/content/resourceBuilder";
import llmDrivenSpecCreation from "./llmDrivenSpecCreation";
import makeRlHFpipeline from "./makeRLHFpipeline";
import makeRLAIFpipeline from "./makeRLAIFpipeline";
import specDrivenDevJetbrains from "./specDriveDevJetbrains";
import vibeToSpecDrivenForSDLC from "./vibeToSpecDrivenForSDLC";

export const w3April26Resources: Array<Resource> = [
    llmDrivenSpecCreation,
    makeRlHFpipeline,
    makeRLAIFpipeline,
    specDrivenDevJetbrains,
    vibeToSpecDrivenForSDLC
]
