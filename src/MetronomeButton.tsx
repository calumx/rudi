import { useContext, useEffect, useState } from 'react';
import 'zyklus';
import { TempoContext } from './context/tempoContext';

export const MetronomeButton = () => {
  const [metronomeActive, setMetronomeActive] = useState(false);
  const { currentTempo } = useContext(TempoContext);

  const beep = (ctx: AudioContext) => (t: number) => {
    t += 0.01;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = 375;
    o.type = 'square';
    o.start(t);
    o.stop(t + 0.1);
    const end = t + 0.1;
    o.connect(g);
    const attack = 0.01;
    const release = 0.01;
    const max = 0.8;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(max, t + attack);
    g.gain.setValueAtTime(max, end - release);
    g.gain.linearRampToValueAtTime(0, end);
    g.connect(ctx.destination);
  };

  useEffect(() => {
    if (!metronomeActive) return;
    const ctx = new AudioContext();
    const clock = ctx.createClock(beep(ctx), 60 / currentTempo);

    if (metronomeActive) {
      clock.start();
    }

    return () => {
      if (ctx) {
        clock.stop();
        ctx.close();
      }
    };
  }, [metronomeActive, currentTempo]);

  return (
    <button
      type='button'
      onClick={() => setMetronomeActive(!metronomeActive)}
      style={{ width: '15em' }}
      className={`focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${
        metronomeActive ? stopBtnClassNames : startBtnClassNames
      }`}
    >
      {`${metronomeActive ? 'STOP' : 'START'} METRONOME`}
    </button>
  );
};

const stopBtnClassNames = 'bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700';
const startBtnClassNames = 'bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700';
