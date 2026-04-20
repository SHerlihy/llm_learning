import { Resource } from "@/content/resourceBuilder";
import { w1March26Resources } from "./w1_march_26";
import { w2March26Resources } from "./w2_march_26";
import { w3March26Resources } from "./w3_march_26";
import { w4March26Resources } from "./w4_march_26";
import { w1April26Resources } from "./w1_april_26";
import { w2April26Resources } from "./w2_april_26";
import { w3April26Resources } from "./w3_april_26";

export const allResources: Array<Resource> = [
    ...w1March26Resources,
    ...w2March26Resources,
    ...w3March26Resources,
    ...w4March26Resources,
    ...w1April26Resources,
    ...w2April26Resources,
    ...w3April26Resources
]
