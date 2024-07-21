export interface Timeline {
    timelineName: string, 
    purpose: string, 
    visibility: string,
    editAccess: string,
    intent: string,
    episodeVersions: Episode[]
}

export interface Episode {
    title?: string,
    description?: string,
    type?: string[],
    changes?: boolean,
    eventList?: Event[]
}

export interface Event {
    date?: string,
    title?: string,
    image?: string
    description?: string,
    author?: string
}