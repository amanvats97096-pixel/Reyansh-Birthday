// Web Audio API Synthesizer for Birthday Web App

class SoundEngine {
  public ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  public volume: number = 0.5;
  private masterGain: GainNode | null = null;
  public soundEnabled: boolean = true;
  private activeMelodyTimers: number[] = [];
  public isMelodyPlaying: boolean = false;
  public shouldLoopMelody: boolean = true;
  public onVisualizerUpdate?: (freq: number, active: boolean) => void;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public enableSound(withAudio = true) {
    this.soundEnabled = withAudio;
    if (withAudio) {
      this.initCtx();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  // Balloon Pop Sound
  public playPop() {
    if (!this.soundEnabled || this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.08);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  // Gift Chime Sound
  public playChime() {
    if (!this.soundEnabled || this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50];

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.06);

      gain.gain.setValueAtTime(0.001, t + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.25, t + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + idx * 0.06);
      osc.stop(t + idx * 0.06 + 0.42);
    });
  }

  // Piano Note
  public playPianoNote(freq: number) {
    if (!this.soundEnabled || this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.85);
  }

  // Celebration Fanfare
  public playCelebration() {
    if (!this.soundEnabled || this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    
    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.05);

      gain.gain.setValueAtTime(0.001, t + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.2, t + idx * 0.05 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + idx * 0.05);
      osc.stop(t + idx * 0.05 + 1.25);
    });
  }

  // Happy Birthday Background Loop Player
  public playHappyBirthdayMelody(onFinished?: () => void) {
    this.stopMelody();
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    this.isMelodyPlaying = true;
    this.shouldLoopMelody = true;

    // Happy Birthday in C major
    const notes: [number, number][] = [
      [392.00, 0.75], [392.00, 0.25], [440.00, 1.0], [392.00, 1.0], [523.25, 1.0], [493.88, 2.0],
      [392.00, 0.75], [392.00, 0.25], [440.00, 1.0], [392.00, 1.0], [587.33, 1.0], [523.25, 2.0],
      [392.00, 0.75], [392.00, 0.25], [783.99, 1.0], [659.25, 1.0], [523.25, 1.0], [493.88, 1.0], [440.00, 1.5],
      [698.46, 0.75], [698.46, 0.25], [659.25, 1.0], [523.25, 1.0], [587.33, 1.0], [523.25, 2.5]
    ];

    const tempoBPM = 110;
    const beatDuration = 60 / tempoBPM;
    let accumulatedTime = 0;

    notes.forEach(([freq, duration]) => {
      const noteDurationSec = duration * beatDuration;
      const startTime = accumulatedTime;

      const timerId = window.setTimeout(() => {
        if (this.isMelodyPlaying && !this.isMuted) {
          this.playPianoNote(freq);
          if (this.onVisualizerUpdate) {
            this.onVisualizerUpdate(freq, true);
          }
        }
      }, startTime * 1000);

      this.activeMelodyTimers.push(timerId);
      accumulatedTime += noteDurationSec;
    });

    const totalDuration = accumulatedTime * 1000;
    const endTimerId = window.setTimeout(() => {
      if (this.isMelodyPlaying) {
        if (this.shouldLoopMelody) {
          // Loop continuously for default background music!
          this.playHappyBirthdayMelody(onFinished);
        } else {
          this.isMelodyPlaying = false;
          if (this.onVisualizerUpdate) this.onVisualizerUpdate(0, false);
          if (onFinished) onFinished();
        }
      }
    }, totalDuration + 400);

    this.activeMelodyTimers.push(endTimerId);
  }

  public stopMelody() {
    this.shouldLoopMelody = false;
    this.isMelodyPlaying = false;
    this.activeMelodyTimers.forEach((id) => clearTimeout(id));
    this.activeMelodyTimers = [];
    if (this.onVisualizerUpdate) {
      this.onVisualizerUpdate(0, false);
    }
  }

  public pauseForTabHidden() {
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
    }
  }

  public resumeForTabVisible() {
    if (this.ctx && this.ctx.state === 'suspended' && this.soundEnabled) {
      this.ctx.resume();
    }
  }
}

export const soundEngine = new SoundEngine();
