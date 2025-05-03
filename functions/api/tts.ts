// functions/api/tts.js

export async function onRequestGet({ request }) {
    const url = new URL(request.url);
    const text = url.searchParams.get("text");
  
    if (!text) {
      return new Response("Missing 'text' parameter", { status: 400 });
    }
  
    const apiKey = process.env.GOOGLE_API_KEY;
    const ttsUrl = "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + apiKey;
  
    const payload = {
      input: { text },
      voice: {
        languageCode: "en-US",
        name: "en-US-Wavenet-D"
      },
      audioConfig: {
        audioEncoding: "MP3"
      }
    };
  
    const response = await fetch(ttsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  
    if (!response.ok) {
      return new Response("TTS request failed", { status: 500 });
    }
  
    const data = await response.json();
  
    // Cloudflare Functions では atob() がないので、base64を手動で変換
    const binary = Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0));
  
    return new Response(binary.buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000"
      }
    });
  }
  