import fs from 'fs/promises';
import path from 'path';

// this must not trigger any cors errors anywhere
export async function GET() {
    // read the audio file from the public folder
    // Construct the path to the file inside the public directory
    const filePath = path.join(process.cwd(), 'public', 'video.mp4');
    // Read the file content asynchronously
    const videoFile = await fs.readFile(filePath);

    return new Response(videoFile, {
        headers: {
            'Content-Type': 'video/mp4',
            'Content-Length': videoFile.byteLength.toString(),
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        status: 200,
    });
}