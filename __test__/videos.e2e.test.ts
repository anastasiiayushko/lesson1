import {setDB} from "../src/db/db";
import request from "supertest"
import {app} from "../src/app";

describe("videos", () => {
    let newlyVideo: any = null;

    const longText = "This is a very long string that exceeds the length limit.";
    beforeAll(async () => {
        newlyVideo = null;
       await request(app)
           .delete('/testing/all-data')
           .expect(204)

        await request(app)
            .get('/videos')
            .expect(200, [])
    })

    it('Get  videos, should be empty array and status 200', async () => {
        await request(app).get('/videos')
            .expect(200, [])

    });

    it('Get non-existing video by id. Should be status code 404', async ()=>{
        await request(app).get('/videos/1000')
            .expect(404)
    })

    it('Create video, empty body. Should be status code 400 and response errorsMessage',
        async () => {
            let createData = {};

            let response = await request(app)
                .post('/videos')
                .send(createData)

            expect(response.status).toBe(400);

            expect(response.body).toMatchObject({
                errorsMessages: expect.arrayContaining([
                    expect.objectContaining({message: expect.any(String), field: "title"}),
                    expect.objectContaining({message: expect.any(String), field: "author"})
                ])
            });

            await request(app).get('/videos').expect(200, [])
        });

    it('Create video, incorrect data contains gap for field  title, author. Should be status code 400 and response errorsMessage',
        async () => {
            let createData = {
                title: null, author: ' '
            }
            let response = await request(app)
                .post('/videos')
                .send(createData)

            expect(response.status).toBe(400);

            expect(response.body).toMatchObject({
                errorsMessages: expect.arrayContaining([
                    expect.objectContaining({message: expect.any(String), field: "title"}),
                    expect.objectContaining({message: expect.any(String), field: "author"})
                ])
            });

            await request(app).get('/videos').expect(200, [])
        });

    it('Create video, incorrect data  for field title maxLength more 40. Should be status code 400 and response errorsMessage',
        async () => {
            let createData = {
                title: longText, author: 'Author'
            }
            let response = await request(app)
                .post('/videos')
                .send(createData)

            expect(response.status).toBe(400);

            expect(response.body).toMatchObject({
                errorsMessages: expect.arrayContaining([
                    expect.objectContaining({message: expect.any(String), field: "title"}),
                ])
            });

            await request(app).get('/videos').expect(200, [])
        });

    it('Create video, incorrect data for field author maxLength more 20. Should be status code 400 and response errorsMessage',
        async () => {
            let createData = {
                title: "title", author: longText
            }
            let response = await request(app)
                .post('/videos')
                .send(createData)

            expect(response.status).toBe(400);

            expect(response.body).toMatchObject({
                errorsMessages: expect.arrayContaining([
                    expect.objectContaining({message: expect.any(String), field: "author"}),
                ])
            });

            await request(app).get('/videos').expect(200, [])
        });

    it('Create video, correct data. Should be status code 201 and newly video',
        async () => {
            let createData = {
                title: "title", author: "author"
            }
            let response = await request(app)
                .post('/videos')
                .send(createData)
            newlyVideo = response.body;
            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                ...newlyVideo,
                title: createData.title,
                author: createData.author
            });
            await request(app).get('/videos').expect(200, [
                newlyVideo
            ])
        });

    it('Update non-existent video by id. Should be status code 404',
        async () => {
            let response = await request(app)
                .put('/videos/10000')
                .send({title: "title", author: "author"})
                .expect(404)

            await request(app).get('/videos').expect(200, [newlyVideo]);
        });

    it('Update video by id, incorrect data title empty and minAgeRestriction more than 18. Should be status code 400 and errorsMessage',
        async () => {
            let update = {
                "title": "",
                "author": "author",
                "availableResolutions": null,
                "minAgeRestriction": 22,
                "publicationDate": "2024-12-07T15:45:42.361Z"
            }
            let response = await request(app)
                .put(`/videos/${newlyVideo.id}`)
                .send(update)
            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                errorsMessages: expect.arrayContaining([
                    expect.objectContaining(
                        {message: expect.any(String), field: "title"}
                    ),
                    expect.objectContaining(
                        {message: expect.any(String), field: "minAgeRestriction"}
                    ),
                ])
            });


            await request(app).get('/videos').expect(200, [newlyVideo]);
        });

    it('Update video by id, incorrect  minAgeRestriction less than 1. Should be status code 400 and errorsMessage',
        async () => {
            let update = {
                "minAgeRestriction": 0,
            }
            let response = await request(app)
                .put(`/videos/${newlyVideo.id}`)
                .send(update)
            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                errorsMessages: expect.arrayContaining([
                    expect.objectContaining(
                        {message: expect.any(String), field: "minAgeRestriction"}
                    ),
                ])
            });


            await request(app).get('/videos').expect(200, [newlyVideo]);
        });

    it('Update video by id, incorrect  Resolutions. Should be status code 400 and errorsMessage',
        async () => {
            let update = {
                "availableResolutions": ["P122"],
            }
            let response = await request(app)
                .put(`/videos/${newlyVideo.id}`)
                .send(update)
            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                errorsMessages: expect.arrayContaining([
                    expect.objectContaining(
                        {message: expect.any(String), field: "availableResolutions"}
                    ),
                ])
            });


            await request(app).get('/videos').expect(200, [newlyVideo]);
        });

    it('Update video by id, incorrect  PublicationDate. Should be status code 400 and errorsMessage',
        async () => {
            let update = {
                "publicationDate": "18.02.12",
            }
            let response = await request(app)
                .put(`/videos/${newlyVideo.id}`)
                .send(update)
            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                errorsMessages: expect.arrayContaining([
                    expect.objectContaining(
                        {message: expect.any(String), field: "publicationDate"}
                    ),
                ])
            });


            await request(app).get('/videos').expect(200, [newlyVideo]);
        });

    it('Update video by id, correct data. Should be status code 204',
        async () => {
            let update = {
                "title": "string",
                "author": "string",
                "availableResolutions": [
                    "P144"
                ],
                "canBeDownloaded": true,
                "minAgeRestriction": 18,
                "publicationDate": "2024-12-07T15:45:42.361Z"
            }
            let response = await request(app)
                .put(`/videos/${newlyVideo.id}`)
                .send(update)
                .expect(204);

            newlyVideo = {
                ...newlyVideo,
                ...update
            }
            await request(app).get('/videos').expect(200, [newlyVideo]);
        });


    it('Delete non-existent video by id. Should be status code 404',
        async () => {
            let response = await request(app)
                .delete('/videos/10000')
                .expect(404)

            await request(app).get('/videos').expect(200, [newlyVideo]);
        });

    it('Delete existent video by id. Should be status code 204',
        async () => {
            let response = await request(app)
                .delete(`/videos/${newlyVideo.id}`)
                .expect(204)

            await request(app).get('/videos').expect(200, []);
        });

})