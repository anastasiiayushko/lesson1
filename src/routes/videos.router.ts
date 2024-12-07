import express, {Request, Response, NextFunction} from "express";
import {
    deleteVideoByIdController,
    getVideosController,
    setVideoController,
    updateVideoByIdController
} from "../controller/videos.controller";
import {validateSetVideo, validateUpdateVideo} from "../validator/videos.validator";
import {InputVideoType} from "../types/video-types";
import {ItemErrorType} from "../types/output-errors-type";


const videosRouter = express.Router();


videosRouter.get("/", getVideosController);

videosRouter.post("/", (
    req:Request<{}, {}, InputVideoType>,
    res:Response<{}, {errors:ItemErrorType[] }>, next:NextFunction) => {
    let body = req.body;
    let title = body.title;
    let author = body.author;
    let availableResolutions = body?.availableResolutions;
    let canBeDownloaded = body?.canBeDownloaded;
    let minAgeRestriction = body.minAgeRestriction;
    let errors: ItemErrorType[] = validateSetVideo(title, author, availableResolutions, minAgeRestriction, canBeDownloaded)
    res.locals.errors = errors;
    next();
},
    setVideoController);

videosRouter.put("/:id", (req, res, next) => {
    let body = req.body;
    let title = body.title;
    let author = body.author;
    let availableResolutions = body?.availableResolutions;
    let canBeDownloaded = body?.canBeDownloaded;
    let minAgeRestriction = body.minAgeRestriction;
    let publicationDate = body.publicationDate;
    let errors: ItemErrorType[] = validateUpdateVideo(title, author, availableResolutions, minAgeRestriction, canBeDownloaded, publicationDate)
    res.locals.errors = errors;
    next();

},
    updateVideoByIdController);

videosRouter.delete("/:id", deleteVideoByIdController)

export default videosRouter;