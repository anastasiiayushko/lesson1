import express, {Request, Response} from "express"
import videosRouter from "./routes/videos.router";
import {SETTINGS_STATUS_CODE} from "./settings";

export const app = express();

app.use(express.json());


app.use('/videos', videosRouter);

app.use('/', (req: Request, res: Response) => {
    res.send(SETTINGS_STATUS_CODE.NO_CONTENT_204);
});
