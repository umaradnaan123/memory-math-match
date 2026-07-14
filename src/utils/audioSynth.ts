// Web Audio API Synthesizer for fully offline sound effects and background music
let audioCtx: AudioContext | null = null;
let musicInterval: ReturnType<typeof setInterval> | null = null;

interface WebkitWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const W = window as unknown as WebkitWindow;
    const AudioContextClass = window.AudioContext || W.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function playSound(type: 'flip' | 'correct' | 'wrong' | 'victory' | 'countdown' | 'gameover', volume = 0.5) {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  switch (type) {
    case 'flip':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
      gain.gain.setValueAtTime(volume * 0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
      break;

    case 'correct':
      // Arpeggio
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
      break;

    case 'wrong':
      // Low descending buzz
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.3);
      gain.gain.setValueAtTime(volume * 0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
      break;

    case 'victory':
      // Ascending triumphant melody
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const oscNode = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscNode.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscNode.type = 'triangle';
        oscNode.frequency.setValueAtTime(freq, now + index * 0.1);
        gainNode.gain.setValueAtTime(volume, now + index * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.25);
        oscNode.start(now + index * 0.1);
        oscNode.stop(now + index * 0.1 + 0.25);
      });
      break;

    case 'countdown':
      // High-pitched warning beep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(volume * 0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
      break;

    case 'gameover':
      // Descending sad tones
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(293.66, now); // D4
      osc.frequency.setValueAtTime(277.18, now + 0.2); // C#4
      osc.frequency.setValueAtTime(261.63, now + 0.4); // C4
      osc.frequency.setValueAtTime(196.00, now + 0.6); // G3
      gain.gain.setValueAtTime(volume * 0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
      osc.start(now);
      osc.stop(now + 1.0);
      break;
  }
}

// Background Music Generator (Synthesizes procedural ambient loops offline)
export function startBackgroundMusic(theme: 'relaxing' | 'kids' | 'arcade' | 'fantasy' | 'space' | 'forest', volume = 0.3) {
  stopBackgroundMusic();
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  let tempo = 120;
  let scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88]; // Major scale

  if (theme === 'space') {
    scale = [261.63, 293.66, 311.13, 392.00, 415.30, 523.25]; // Minor/Spacey scale
    tempo = 80;
  } else if (theme === 'arcade') {
    scale = [130.81, 146.83, 164.81, 196.00, 220.00, 261.63, 329.63]; // Retro arpeggio
    tempo = 140;
  } else if (theme === 'kids') {
    scale = [261.63, 293.66, 329.63, 392.00, 440.00]; // Pentatonic happy
    tempo = 110;
  }

  const stepTime = 60 / tempo;
  let step = 0;

  musicInterval = setInterval(() => {
    const context = getAudioContext();
    if (!context) return;
    const now = context.currentTime;

    // Simple bass note on beat 1 & 3
    if (step % 4 === 0 || step % 4 === 2) {
      const oscBass = context.createOscillator();
      const gainBass = context.createGain();
      oscBass.connect(gainBass);
      gainBass.connect(context.destination);
      oscBass.type = 'triangle';
      oscBass.frequency.setValueAtTime(scale[0] / 2, now); // Octave down
      gainBass.gain.setValueAtTime(volume * 0.6, now);
      gainBass.gain.exponentialRampToValueAtTime(0.01, now + stepTime * 1.8);
      oscBass.start(now);
      oscBass.stop(now + stepTime * 1.8);
    }

    // Melodic arpeggios
    if (Math.random() > 0.4) {
      const oscMel = context.createOscillator();
      const gainMel = context.createGain();
      oscMel.connect(gainMel);
      gainMel.connect(context.destination);
      oscMel.type = theme === 'arcade' ? 'square' : 'sine';
      
      const noteIndex = Math.floor(Math.random() * scale.length);
      const freq = scale[noteIndex] * (theme === 'space' ? 2 : 1);
      
      oscMel.frequency.setValueAtTime(freq, now);
      gainMel.gain.setValueAtTime(volume * 0.4, now);
      gainMel.gain.exponentialRampToValueAtTime(0.01, now + stepTime * 0.8);
      oscMel.start(now);
      oscMel.stop(now + stepTime * 0.8);
    }

    step++;
  }, stepTime * 1000);
}

export function stopBackgroundMusic() {
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}
