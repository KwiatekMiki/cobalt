import { genericUserAgent } from "../../config.js";

export default async function({ id }) {
    const req = await fetch(`https://today.com/video/${id}`, {
        method: "GET",
        headers: {
            "user-agent": genericUserAgent,
        }
    })
    .then(request => request.text())
    .catch(() => {});
    
    if (!req) return { error: 'ErrorEmptyDownload' };
    const videoUrl = req?.split(',"contentUrl":"')[1].split('"')[0];
    
    if (videoUrl?.includes('.m3u8')) {
        return {
            filename: `today_${id}.mp4`,
            audioFilename: `today_${id}_audio`,
            isM3U8: true
        }
    }

    return { error: 'ErrorEmptyDownload' }
}