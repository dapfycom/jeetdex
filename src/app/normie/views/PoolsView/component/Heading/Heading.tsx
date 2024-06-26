const Heading = () => {
  return (
    <div className='rounded-2xl p-6 flex flex-col gap-5 w-full text-center'>
      <div className='flex w-full justify-center '>
        <h1 className='text-4xl font-semibold text-center'>Liquidity Pools</h1>
        <div className='flex gap-6'>
          {/* <InfoBox
            icon={
              <div className={`bottom-0 right-0 absolute rotate-45`}>
                <FontAwesomeIcon
                  icon={faLock}
                  className='w-10 h-10 mb-[-10px] text-gray-400/50'
                />
              </div>
            }
            title='TVL'
            value='$1,051,317,703.37'
          /> */}

          {/* <InfoBox
            icon={
              <div className={`bottom-2 right-1 absolute rotate-45`}>
                <FontAwesomeIcon
                  icon={faChartLine}
                  className='w-7 h-7 mb-[-10px] text-gray-400/50'
                />
              </div>
            }
            title='24H Volume'
            value='$939,931,073'
          /> */}
        </div>
      </div>

      <h2 className='text-sm text-muted-foreground'>
        Provide liquidity, earn yield.
      </h2>
    </div>
  );
};

export default Heading;
