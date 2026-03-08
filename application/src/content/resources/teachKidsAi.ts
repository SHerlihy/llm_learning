import { ResourceBuilder } from "../resourceBuilder";

const teachKidsAi = new ResourceBuilder('Teach teens computing: Machine learning and AI by Raspberry Pi')
.setOverview('Discover machine learning and how it works, and train your own AI using free online tools.')
.setDateOfInclusion(new Date(2026, 3, 4))
.setHref('https://training-hub.raspberrypi.org/en/courses/teach-teens-computing-machine-learning-and-ai/?utm_source=rpf-online-courses-homepage-machine-learning&utm_medium=web&utm_campaign=rpf-online-courses-homepage')
.setTag('kids')
.setTag('coding')
.build()

export default teachKidsAi
