const ProgressBar = ({ preventiveCount, correctiveCount }) => {

    const total = preventiveCount + correctiveCount;
    const prevCount = ( preventiveCount * 100 ) / total;
    const CorrCount = ( correctiveCount * 100 ) / total;

    return (
      <div className='w-full h-auto bg-blue-800 rounded-md flex justify-center items-center'>
        <div style={{ width: `${(CorrCount)}%` }} className='rounded-l-md bg-green-500 font-bold text-white transition duration-700 ease-linear flex justify-center items-center'>
            { correctiveCount }
        </div>
        <div style={{ width: `${(prevCount)}%` }} className='rounded-r-md bg-red-500 font-bold text-white transition duration-700 ease-linear flex justify-center items-center'>
            { preventiveCount }
        </div>
      </div>
    );
  };

export default ProgressBar;
