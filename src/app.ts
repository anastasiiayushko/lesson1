import express, {Request, Response} from "express"
import videosRouter from "./routes/videos.router";
import {SETTINGS_STATUS_CODE} from "./settings";
import {setDB} from "./db/db";

export const app = express();

app.use(express.json());

app.delete('/testing/all-data', (req, res)=>{
    setDB(null)
    res.sendStatus(SETTINGS_STATUS_CODE.NO_CONTENT_204)
})
app.use('/videos', videosRouter);

app.get('/', (req: Request, res: Response) => {
    res.send()
});
