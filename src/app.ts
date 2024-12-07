import express, {Request, Response} from "express"
import videosRouter from "./routes/videos.router";
import {SETTINGS_STATUS_CODE} from "./settings";

export const app = express();

app.use(express.json());


app.use('/videos', videosRouter);

app.get('/', (req: Request, res: Response) => {
    res.send()
});
