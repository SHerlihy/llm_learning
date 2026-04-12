import { Tag } from ".";

export type Resource = {
    resourceName: string;
    dateOfInclusion: Date;
    href: string;
    overview: string;
    tags: Set<Tag>;
    flashcards: Record<string, string>;
}

interface IResourceBuilder {
    setDateOfInclusion: (name: Date) => void;
    setHref: (href: string) => void;
    setOverview: (overview: string) => void;
    setTag: (tag: Tag) => void;
    setFlashcard: (keyword: string, definition: string) => void;
    build: () => Resource;
}

export class ResourceBuilder implements IResourceBuilder {
    private name: string
    private dateOfInclusion: Date
    private href: string
    private overview: string
    private tags: Set<Tag> = new Set([])
    private flashcards: Record<string, string> = {}

    constructor(name: string) {
        this.name = name;
    }

    setFlashcard = (keyword: string, definition: string) => {
        this.flashcards[keyword] = definition
        return this
    }

    setDateOfInclusion = (date: Date) => {
        this.dateOfInclusion = date;
        return this;
    }

    setHref = (href: string) => {
        this.href = href
        return this
    }

    setOverview = (overview: string) => {
        this.overview = overview
        return this
    }

    setTag = (tag: Tag) => {
        this.tags.add(tag)
        return this
    }

    build = () => {
        if (Object.keys(this.flashcards).length > 0) {
            this.setTag('remember')
        }

        return {
            resourceName: this.name,
            dateOfInclusion: this.dateOfInclusion,
            href: this.href,
            overview: this.overview,
            tags: this.tags,
            flashcards: this.flashcards
        }
    }
}
