type DirectionBtnProps = {
  direction: string;
  onClick: () => void;
};

export const DirectionButton = ({ direction, onClick }: DirectionBtnProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700'
    >
      {direction === 'left' ? '\u2190' : '\u2192'}
    </button>
  );
};
