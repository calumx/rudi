import { useContext, useEffect, useState } from 'react';
import { initialiseData } from './helpers/initialiseData';
import { TempoContext } from './context/tempoContext';
import { TempoSlider } from './TempoSlider';
import { MetronomeButton } from './MetronomeButton';
import { RudimentSelector } from './RudimentSelector';

export type Rudiment = {
  id: number;
  name: string;
  tempo: number;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [allRudiments, setAllRudiments] = useState<Rudiment[]>([]);
  const [currentRudiment, setCurrentRudiment] = useState<Rudiment>({} as Rudiment);
  const { currentTempo } = useContext(TempoContext);

  useEffect(() => {
    if (!loading) return;

    initialiseData().then((data) => {
      setAllRudiments(data);
      setCurrentRudiment(data[0]);
      setLoading(false);
    });
  }, [loading]);

  const saveHighestTempo = () => {
    const updatedRecords = allRudiments.map((rudiment: Rudiment) => {
      return rudiment.id === currentRudiment.id ? { ...rudiment, tempo: currentTempo } : rudiment;
    });

    setCurrentRudiment((prev) => {
      return { ...prev, tempo: currentTempo };
    });

    localStorage.setItem('rudiments', JSON.stringify(updatedRecords));
    return setAllRudiments(updatedRecords);
  };

  return loading ? (
    'Loading...'
  ) : (
    <div className='flex flex-col justify-center items-center dark:bg-slate-950 h-screen w-screen overflow-hidden'>
      <RudimentSelector allRudiments={allRudiments} currentRudiment={currentRudiment} setCurrentRudiment={setCurrentRudiment} />
      <div className='border-2 border-rose-500 rounded-lg p-6 w-80 flex flex-col items-center' style={{ boxSizing: 'border-box' }}>
        <TempoSlider saveHighestTempo={saveHighestTempo} />
        <MetronomeButton />
      </div>
    </div>
  );
};

export default App;
