import {Request, Response} from 'express';
import {SETTINGS_STATUS_CODE} from "../settings";
import {db} from "../db/db";
import {UpdateInputVideoModel, CreateInputVideoModel, VideoType} from "../types/video-types";
import {OutputErrorsType} from "../types/output-errors-type";


export const getVideosController = async (
    req: Request,
    res: Response<VideoType[]>) => {
    try {
        res.status(SETTINGS_STATUS_CODE.OK_200).json(db.videos)
    } catch (e) {
        console.error(e);
        res.sendStatus(SETTINGS_STATUS_CODE.BAD_REQUEST_400)
    }
}

export const setVideoController = (
    req: Request<{}, {}, CreateInputVideoModel>,
    res: Response<VideoType | OutputErrorsType>) => {
    try {
        let errors = res.locals.errors;
        if (errors.length > 0) {
            res.status(SETTINGS_STATUS_CODE.BAD_REQUEST_400).json({errorsMessages: errors})
            return;
        }
        let body = req.body;

        const createdAt = new Date();
        const publicationDate = new Date(createdAt);
        publicationDate.setDate(createdAt.getDate() + 1);

        let id: number = (Date.now() + Math.random()) as number;

        let newCourse = {
            id: parseInt(String(id)),
            title: body.title,
            author: body.author,
            canBeDownloaded: body?.canBeDownloaded ?? false,
            availableResolutions: body.availableResolutions ?? null,
            minAgeRestriction: body.minAgeRestriction ?? null,
            createdAt: createdAt.toISOString(),
            publicationDate: publicationDate.toISOString()
        }
        db.videos.push(newCourse);
        res.status(SETTINGS_STATUS_CODE.CREATED_201).send(newCourse);
    } catch (e) {
        res.sendStatus(SETTINGS_STATUS_CODE.BAD_REQUEST_400)
    }
}

export const deleteVideoByIdController = (
    req: Request<{ id: string }>,
    res: Response): any => {
    try {
        let id = +req.params.id;
        let findVideo = db.videos.find(video => video.id === id);

        if (!findVideo) {
            res.sendStatus(SETTINGS_STATUS_CODE.NOT_FOUND_404);
            return
        }
        db.videos = db.videos.filter(video => video.id !== id);

        res.sendStatus(SETTINGS_STATUS_CODE.NO_CONTENT_204);
    } catch (e) {
        res.sendStatus(SETTINGS_STATUS_CODE.BAD_REQUEST_400)
    }
}

export const updateVideoByIdController =
    (req: Request<{ id: string }, {}, UpdateInputVideoModel>,
     res: Response<OutputErrorsType>): any => {
        try {
            let errors = res.locals.errors;
            if (errors.length > 0) {
                res.status(SETTINGS_STATUS_CODE.BAD_REQUEST_400).json({errorsMessages: errors})
                return;
            }

            let id = +req.params.id;
            let findVideo = db.videos.find(video => video.id === id);

            if (!findVideo) {
                res.sendStatus(SETTINGS_STATUS_CODE.NOT_FOUND_404);
                return
            }

            let bodyVideoDate:object = {
                title: req.body.title,
                author: req.body.author,
                canBeDownloaded: req.body.canBeDownloaded,
                availableResolutions: req.body.availableResolutions,
                minAgeRestriction: req.body.minAgeRestriction,
                publicationDate: req.body.publicationDate,
            }
            let videoUpdate = {...findVideo};
            for (let [key, value] of Object.entries(bodyVideoDate)) {
                if (value !== undefined && videoUpdate.hasOwnProperty(key)) {
                    //@ts-ignore
                    videoUpdate[key] = value;
                }
            }
            db.videos = db.videos.map(video => {
                if (video.id === id) {
                    return videoUpdate;
                }
                return video;
            });
            res.sendStatus(SETTINGS_STATUS_CODE.NO_CONTENT_204);
        } catch (e) {
            res.sendStatus(SETTINGS_STATUS_CODE.BAD_REQUEST_400);
        }
    }