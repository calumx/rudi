type Rudiment = {
  id: number;
  name: string;
  tempo: number;
};

export const parseRudimentArray = (arr: Rudiment[]) => {
  arr.sort((a, b) => a.tempo - b.tempo);
  //sort by tempo ascending, your slowest first.

  const groupedByHighestTempo = arr.reduce<Rudiment[][]>((result, obj) => {
    //group into sub-arrays of similar tempi
    const lastSubArray = result[result.length - 1];

    if (lastSubArray && lastSubArray[0].tempo === obj.tempo) {
      lastSubArray.push(obj);
    } else {
      result.push([obj]);
    }
    return result;
  }, []);

  const shuffledArrs = groupedByHighestTempo.map((arr) => fisherYatesShuffle(arr));
  //randomise order of each sub-array before joining all back together.
  return ([] as Rudiment[]).concat(...shuffledArrs);
};

const fisherYatesShuffle = (arr: Rudiment[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
