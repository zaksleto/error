// app/api/route.js 👈🏽

import { NextResponse, NextRequest } from "next/server";
import fs from 'fs/promises';

// To handle a POST request to /api
export async function POST(request: NextRequest) {
  // get the params
  const { 
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    funil_id,
    funil_name,
    headScripts,
    footerScripts,
    inlineScripts
  } = await request.json();

  if (!funil_name) {
    return NextResponse.json({ message: "Missing funil_name" }, { status: 400 });
  }
  if (!funil_id) {
    return NextResponse.json({ message: "Missing funil_id" }, { status: 400 });
  }
  if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId) {
    return NextResponse.json({ message: "Missing firebase params" }, { status: 400 });
  }

  // We need to read the index.html file from the /app/api/index.html
  const indexHtml = await fs.readFile('./app/api/html_result/index.html', 'utf8');

  // Replace the placeholder values with the actual values
  let html = indexHtml.replace(/{{apiKey}}/g, apiKey)
    .replace(/{{authDomain}}/g, authDomain)
    .replace(/{{projectId}}/g, projectId)
    .replace(/{{storageBucket}}/g, storageBucket)
    .replace(/{{messagingSenderId}}/g, messagingSenderId)
    .replace(/{{appId}}/g, appId)
    .replace(/{{funil_id}}/g, funil_id)
    .replace(/{{funil_name}}/g, funil_name);

  // Replace script placeholders with actual scripts
  if (headScripts && headScripts.length > 0) {
    html = html.replace('<!-- RENDER SCRIPT WITH LOCATION = HEAD HERE -->', headScripts.join('\n  '));
  } else {
    html = html.replace('<!-- RENDER SCRIPT WITH LOCATION = HEAD HERE -->', '');
  }

  if (footerScripts && footerScripts.length > 0) {
    html = html.replace('<!-- RENDER SCRIPT WITH LOCATION = FOOTER HERE -->', footerScripts.join('\n  '));
  } else {
    html = html.replace('<!-- RENDER SCRIPT WITH LOCATION = FOOTER HERE -->', '');
  }

  return NextResponse.json({ html, funil_id }, { status: 200 });
}