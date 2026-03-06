import { Tag } from ".";

export type Resource = {
    resourceName: string;
    dateOfInclusion: Date;
    href: string;
    overview: string;
    tags: Set<Tag>;
}

interface IResourceBuilder {
    setDateOfInclusion: (name: Date) => void;
    setHref: (href: string) => void;
    setOverview: (overview: string) => void;
    setTag: (tag: Tag) => void;
    build: () => Resource;
}

export class ResourceBuilder implements IResourceBuilder {
    private name: string
    private dateOfInclusion: Date
    private href: string
    private overview: string
    private tags: Set<Tag> = new Set([])

    constructor(name: string) {
        this.name = name;
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
        return {
            resourceName: this.name,
            dateOfInclusion: this.dateOfInclusion,
            href: this.href,
            overview: this.overview,
            tags: this.tags
        }
    }
}
