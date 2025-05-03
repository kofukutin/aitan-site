export async function onRequestGet({ request, env }) {
    const url = new URL(request.url);
    const text = url.searchParams.get("text");
  
    if (!text) {
      return new Response("Missing 'text' parameter", { status: 400 });
    }
  
    const apiKey = env.GOOGLE_API_KEY;
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
      const errorText = await response.text();
      return new Response("TTS request failed: " + errorText, { status: 500 });
    }
  
    const data = await response.json();
    const audio = data.audioContent;
  
    return new Response(Uint8Array.from(atob(audio), c => c.charCodeAt(0)), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000"
      }
    });
  }
  