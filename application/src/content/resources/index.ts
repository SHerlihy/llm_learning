import loavableVAntigrav from "./lovableVAntigrav";
import onlineSafetyAndAi from "./onlineSafetyAndAi";
import { Resource } from "./resourceBuilder";
import teachKidsAi from "./teachKidsAi";
import usingClaudeJR from "./usingClaudeJR";

export const allResourcesByDoI: Array<Resource> = [
    loavableVAntigrav,
    usingClaudeJR,
    teachKidsAi,
    onlineSafetyAndAi
]
    .sort((a, b) => b.dateOfInclusion.getTime() - a.dateOfInclusion.getTime())

