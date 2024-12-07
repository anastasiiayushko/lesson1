import {Resolutions} from "../types/video-types";
import {ItemErrorType} from "../types/output-errors-type";

const validateVideoTitle = (title: any): null | ItemErrorType => {
    if (!title || !title.trim()) {
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

    if (title?.trim().length > 40) {
        return {
            field: 'title',
            message: 'Length should be less than 40 characters',
        }
    }
    return null

}

const validateVideoAuthor = (author: any): null | ItemErrorType => {

    if (!author || !author.trim()) {
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

const validateResolution = (resolution: any): null | ItemErrorType => {
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

const validateCanBeDownloaded = (canBeDownloaded: any): null | ItemErrorType => {
    if (canBeDownloaded === undefined) {
        return null;
    }

    if (typeof canBeDownloaded === 'boolean') {
        return null;
    }

    return {
        field: 'canBeDownloaded',
        message: 'Field should be boolean value',
    }
}

function validateMinAgeRestriction(minAgeRestriction: any): null | ItemErrorType {
    if (minAgeRestriction === null || minAgeRestriction === undefined) {
        return null
    }
    if (typeof minAgeRestriction !== 'number') {
        return {
            field: 'minAgeRestriction',
            message: 'Field should be value minimum:1, maximum:18 or null set no restriction',
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
            message: `Maximum value 18`,
            field: 'minAgeRestriction',
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
            message: `The date format is incorrect. Please use the format "YYYY-MM-DDTHH:MM:SS.sssZ" (e.g., 2024-12-05T12:48:53.477Z).`,
            field: 'publicationDate',
        }
    }
    return null;
}

export const validateSetVideo = (title: any, author: any, availableResolutions: any, minAgeRestriction: any, canBeDownloaded: any): ItemErrorType[] => {

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

export const validateUpdateVideo = (title: any, author: any, availableResolutions: any, minAgeRestriction: any, canBeDownloaded: any, publicationDate: any): ItemErrorType[] => {

    let errors = [];
    let errorTitle: any = title !== undefined ? validateVideoTitle(title) : null;
    let errorAuthor: any = author !== undefined ? validateVideoAuthor(author) : null
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
