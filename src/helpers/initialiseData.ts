import { parseRudimentArray } from './parseRudimentArray';
import { rudimentList } from './rudimentList';
import { Rudiment } from '../App';

export const initialiseData = (): Promise<Rudiment[]> => {
  return new Promise((resolve) => {
    const checkLocalStorage = () => {
      const rudimentsFromStorage = JSON.parse(localStorage.getItem('rudiments') || '[]');
      if (rudimentsFromStorage?.length) {
        const sortedArr = parseRudimentArray(rudimentsFromStorage);
        resolve(sortedArr);
      } else {
        initialiseRudiments();
      }
    };

    const initialiseRudiments = () => {
      const rudimentsWithTempi = rudimentList.map((rudiment) => {
        return { ...rudiment, tempo: 60 };
      });
      const sortedArr = parseRudimentArray(rudimentsWithTempi);
      localStorage.setItem('rudiments', JSON.stringify(sortedArr));
      resolve(sortedArr);
    };

    checkLocalStorage();
  });
};
