import { Resource } from "@/content/resourceBuilder";
import { w1March26Resources } from "./w1_march_26";
import { w2March26Resources } from "./w2_march_26";
import { w3March26Resources } from "./w3_march_26";

export const allResources: Array<Resource> = [
    ...w1March26Resources,
    ...w2March26Resources,
    ...w3March26Resources
]
