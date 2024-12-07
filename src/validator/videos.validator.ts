import {Resolutions} from "../types/video-types";

const validateVideoTitle = (title: any): any => {
    if (!title) {
        return {
            field: 'title',
            message: 'Please enter a title',
        }
    }
    if (typeof title !== "string") {
        return {
            field: 'title',
            message: 'Field should be string value',
        }
    }

    if (title.length > 40) {
        return {
            field: 'title',
            message: 'Length should be less than 40 characters',
        }
    }
    return null

}

const validateVideoAuthor = (author: any): any => {

    if (!author) {
        return {
            field: 'author',
            message: 'Please enter a author',
        }
    }

    if (typeof author !== "string") {
        return {
            field: 'author',
            message: 'Field should be string value',
        }
    }

    if (author.length > 20) {
        return {
            field: 'author',
            message: 'Length should be less than 20 characters',
        }
    }
    return null

}

const validateResolution = (resolution: any): any => {
    if (resolution === null || resolution === undefined) {
        return null;
    }
    if (!Array.isArray(resolution) || !resolution?.every(key => Object.keys(Resolutions).includes(key))) {
        return {
            field: 'availableResolutions',
            message: `Please enter a resolutions ${Object.values(Resolutions).join()}`,
        }
    }
    return null;
}

const validateCanBeDownloaded = (canBeDownloaded: any) => {

    if (canBeDownloaded === undefined) {
        return null;
    }

    // Проверяем, что значение является типом boolean
    if (typeof canBeDownloaded === 'boolean') {
        return null;
    }

    return {
        field: 'canBeDownloaded',
        massage: 'Field should be boolean value',
    }
}

function validateMinAgeRestriction(minAgeRestriction: any) {
    if (minAgeRestriction === null || minAgeRestriction === undefined) {
        return null
    }
    // Проверяем, что значение является типом boolean
    if (typeof minAgeRestriction !== 'number') {
        return {
            field: 'minAgeRestriction',
            massage: 'Field should be value minimum:1, maximum:18 or null set no restriction',
        }
    }
    if (Number(minAgeRestriction) < 1) {
        return {
            field: 'minAgeRestriction',
            message: `Minimum value 1`,
        }
    }
    if (Number(minAgeRestriction) > 18) {
        return {
            field: 'minAgeRestriction',
            message: `Maximum value 18`,
        }
    }

    return null;
}

function validateDateFormatISO(value: any) {
    if (value === undefined) {
        return null
    }
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    if (!regex.test(value)) {
        return {
            field: 'publicationDate',
            message: `The date format is incorrect. Please use the format "YYYY-MM-DDTHH:MM:SS.sssZ" (e.g., 2024-12-05T12:48:53.477Z).`,
        }
    }
    return null;
}

export const validateSetVideo = (title: any, author: any, availableResolutions: any, minAgeRestriction: any, canBeDownloaded: any): any => {

    let errors = [];

    let errorTitle: any = validateVideoTitle(title);
    let errorAuthor: any = validateVideoAuthor(author);
    let errorResolutions: any = validateResolution(availableResolutions);
    let errorCanBeDownloaded: any = validateCanBeDownloaded(canBeDownloaded);
    let errorMinAgeRestriction: any = validateMinAgeRestriction(minAgeRestriction);

    if (errorTitle) {
        errors.push(errorTitle)
    }
    if (errorAuthor) {
        errors.push(errorAuthor)
    }
    if (errorResolutions) {
        errors.push(errorResolutions);
    }

    if (errorCanBeDownloaded) {
        errors.push(errorCanBeDownloaded)
    }
    if (errorMinAgeRestriction) {
        errors.push(errorMinAgeRestriction);
    }
    return errors;
}

export const validateUpdateVideo = (title: any, author: any, availableResolutions: any, minAgeRestriction: any, canBeDownloaded: any, publicationDate: any): any => {

    let errors = [];

    let errorTitle: any = title ? validateVideoTitle(title) : null;
    let errorAuthor: any = author ? validateVideoAuthor(author) : null
    let errorResolutions: any = validateResolution(availableResolutions);
    let errorCanBeDownloaded: any = validateCanBeDownloaded(canBeDownloaded);
    let errorMinAgeRestriction: any = validateMinAgeRestriction(minAgeRestriction);
    let errorPublicationDate: any = validateDateFormatISO(publicationDate);

    if (errorTitle) {
        errors.push(errorTitle)
    }
    if (errorAuthor) {
        errors.push(errorAuthor)
    }
    if (errorResolutions) {
        errors.push(errorResolutions);
    }

    if (errorCanBeDownloaded) {
        errors.push(errorCanBeDownloaded)
    }
    if (errorMinAgeRestriction) {
        errors.push(errorMinAgeRestriction);
    }
    if (errorPublicationDate) {
        errors.push(errorPublicationDate)
    }

    return errors;
}
