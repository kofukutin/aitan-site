function atobPolyfill(input) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = input.replace(/=+$/, '');
    let output = '';
  
    for (
      let bc = 0, bs = 0, buffer, idx = 0;
      (buffer = str.charAt(idx++));
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4)
        ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }
  
    return output;
  }
  
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
    const binaryString = atobPolyfill(data.audioContent);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return new Response(bytes.buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000"
      }
    });
  }
  