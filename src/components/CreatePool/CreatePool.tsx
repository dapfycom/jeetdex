import CreatePoolsContainer from './CreatePoolsContainer';
const CreatePool = () => {
  return (
    <div>
      <div className='max-h-[600px] overflow-auto'>
        <div className='flex flex-col items-center text-center '>
          <CreatePoolsContainer />
        </div>
      </div>
    </div>
  );
};

export default CreatePool;
