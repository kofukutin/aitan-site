// assets/js/tts.js
async function playTTS(word) {
    const audio = new Audio('/api/tts?text=' + encodeURIComponent(word));
    try {
      await audio.play();
    } catch (e) {
      audio.load();
      await new Promise(resolve => {
        audio.addEventListener("canplaythrough", () => {
          audio.play();
          resolve();
        });
      });
    }
  }  