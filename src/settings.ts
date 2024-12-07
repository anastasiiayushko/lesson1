import {config} from "dotenv";

config();

export const SETTINGS_CONFIG = {
    PORT: process.env.PORT || 3000,
    PATH: {
        VIDEOS: "/videos",
    }
}

export const SETTINGS_STATUS_CODE = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_401: 401,
    NOT_FOUND_404: 404,
    BAD_REQUEST_400: 400,
    SERVER_ERROR: 500,

}