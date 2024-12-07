export enum Resolutions {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160"
}

export type AvailableResolutionsType = [keyof typeof Resolutions] | null;

export type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    availableResolutions: AvailableResolutionsType
    createdAt: string,
    publicationDate: string,
}

export type CreateInputVideoModel = {
    title: string
    author: string
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null,
    availableResolutions?: AvailableResolutionsType,
}
export type UpdateInputVideoModel = {
    title: string
    author: string
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null,
    availableResolutions?: AvailableResolutionsType,
    publicationDate? : string
}