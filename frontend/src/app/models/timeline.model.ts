export interface Timeline {
    name: string,
    purpose: string,
    visibility: string,
    intent: string,
    episodes: Episode[]
}

export interface Episode {
    title?: string,
    description?: string,
    types?: string[],
    ownership?: string,
    events?: Event[]
}

export interface Event {
    title?: string,
    description?: Description[],
    author?: string,
    ownership?: string,
    formatAllowed: string
}

export interface Description {
    text?: string,
    image?: File
}