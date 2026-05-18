import { ResourceBuilder } from "@/content/resourceBuilder";

const awsAlexaEngChallenges = new ResourceBuilder('Building and managing conversational AI at scale: lessons from Alexa+')
.setHref('https://youtu.be/HBzxf6-7GhQ?si=IxvZ5XYa6jGFiGq9')
.setDateOfInclusion(new Date(2026, 5, 9, 6))
.setOverview('A high level overview of the main engineering challenges tackled in delivering Alexa+')
.setTag('agent')
.setTag('prompting')
.build()

export default awsAlexaEngChallenges
