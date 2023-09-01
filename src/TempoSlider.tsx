import { useContext } from 'react';
import { TempoContext } from './context/tempoContext';

export const TempoSlider = ({ saveHighestTempo }: { saveHighestTempo: () => void }) => {
  const { currentTempo, setCurrentTempo } = useContext(TempoContext);

  return (
    <div className='flex flex-col items-center mb-5 gap-6'>
      <div className='flex flex-col items-center relative w-80'>
        <label
          htmlFor='practice-tempo-slider'
          className='text-3xl font-extrabold dark:text-white text-center'
        >{`Current Tempo: ${currentTempo}`}</label>
        <button onClick={() => saveHighestTempo()} className={`bg-pink-600 text-white p-1 rounded-md w-44`}>
          {'Save Tempo'}
        </button>
      </div>
      {/* slider starts here */}
      <div className='flex justify-center items-center gap-6'>
        <button
          type='button'
          onClick={() => setCurrentTempo((prev) => prev - 1)}
          disabled={!currentTempo || currentTempo === 60}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm py-1.5 px-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700'
        >
          {'-'}
        </button>
        <input
          id='practice-tempo-slider'
          type='range'
          min={60}
          max={250}
          step='1'
          value={currentTempo}
          onChange={(e) => setCurrentTempo(+e.target.value)}
          className='w-100 bg-gray-200 rounded-lg range-lg appearance-none dark:bg-gray-700'
          style={{ cursor: 'pointer' }}
        />
        <button
          type='button'
          onClick={() => setCurrentTempo((prev) => prev + 1)}
          disabled={currentTempo === 250}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm py-1.5 px-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700'
        >
          {'+'}
        </button>
      </div>
    </div>
  );
};
