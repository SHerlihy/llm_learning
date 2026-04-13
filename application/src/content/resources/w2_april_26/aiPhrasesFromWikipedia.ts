import { ResourceBuilder } from "@/content/resourceBuilder";

const aiPhrasesFromWikipedia = new ResourceBuilder('Signs of AI Writting from Wikipedia')
.setHref('https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing#')
.setDateOfInclusion(new Date(2026, 4, 8, 8))
.setOverview('Insignts into what may and what may not be written by AI.')
.setTag('chill')
.setTag('art')
.build()

export default aiPhrasesFromWikipedia
