import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface TempoContextType {
  highestTempo: number;
  currentTempo: number;
  setHighestTempo: Dispatch<SetStateAction<number>>;
  setCurrentTempo: Dispatch<SetStateAction<number>>;
}

export const TempoContext = createContext<TempoContextType>({} as TempoContextType);

export const TempoProvider = ({ children }: { children: ReactNode }) => {
  const [highestTempo, setHighestTempo] = useState(60);
  const [currentTempo, setCurrentTempo] = useState(highestTempo);

  return <TempoContext.Provider value={{ highestTempo, currentTempo, setHighestTempo, setCurrentTempo }}>{children}</TempoContext.Provider>;
};
