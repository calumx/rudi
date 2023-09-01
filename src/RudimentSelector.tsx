import { DirectionButton } from './components/DirectionButton';
import { Rudiment } from './App';

type Props = {
  allRudiments: Rudiment[];
  currentRudiment: Rudiment;
  setCurrentRudiment: (r: Rudiment) => void;
};

export const RudimentSelector = ({ allRudiments, currentRudiment, setCurrentRudiment }: Props) => {
  const getPrevRudiment = () => {
    const currentIndex = allRudiments.findIndex((rudiment) => rudiment.id === currentRudiment.id);
    const prevRudiment = allRudiments[currentIndex - 1];
    setCurrentRudiment(prevRudiment);
  };

  const getNextRudiment = () => {
    const currentIndex = allRudiments.findIndex((rudiment) => rudiment.id === currentRudiment.id);
    const nextRudiment = allRudiments[currentIndex + 1];
    return setCurrentRudiment(nextRudiment);
  };

  return (
    <div className='flex flex-col items-center mb-4 w-full max-w-4xl'>
      <div className='flex items-center justify-center border-2 border-rose-500 rounded-lg p-4 w-5/6 mb-4'>
        <div className={`hidden sm:block ${currentRudiment.id !== allRudiments[0]?.id ? 'visible' : 'invisible'}`}>
          <DirectionButton direction='left' onClick={() => getPrevRudiment()} />
        </div>
        <div className='flex flex-col items-center justify-center w-full'>
          <h1 className='text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
            {currentRudiment?.name}
          </h1>
          <div className='flex relative w-full justify-center'>
            <p className='text-center text-lg font-normal text-gray-900 lg:text-xl dark:text-white'>{`Highest Tempo: ${
              currentRudiment.tempo || '--'
            }`}</p>
          </div>
        </div>
        <div className={`hidden sm:block ${currentRudiment.id !== allRudiments[allRudiments.length - 1]?.id ? 'visible' : 'invisible'}`}>
          <DirectionButton direction='right' onClick={() => getNextRudiment()} />
        </div>
      </div>
      {/* small screen block below */}
      <div className='flex justify-between w-3/4 sm:hidden'>
        <div className={`flex flex-col ${currentRudiment.id !== allRudiments[0]?.id ? 'visible' : 'invisible'}`}>
          <DirectionButton direction='left' onClick={() => getPrevRudiment()} />
          <p className='text-white'>Prev</p>
        </div>
        <div className={`flex flex-col ${currentRudiment.id !== allRudiments[allRudiments.length - 1]?.id ? 'visible' : 'invisible'}`}>
          <DirectionButton direction='right' onClick={() => getNextRudiment()} />
          <p className='text-white'>Next</p>
        </div>
      </div>
    </div>
  );
};
