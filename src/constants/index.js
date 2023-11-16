export const BASE_URL = process.env.BASE_URL;
export const API_KEY = process.env.API_KEY;
export const IMAGE_PATH = path => `${process.env.IMAGE_PATH}/${path}`;
export const BACKDROP_PATH = path => `${process.env.BACKDROP_PATH}/${path}`;
export const CLIP_THUMBNAIL = id => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
export const MEDIA_API = process.env.MEDIA_API;
