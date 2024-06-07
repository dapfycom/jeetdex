import CreatePoolsContainer from './CreatePoolsContainer';
const CreatePoolView = () => {
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

export default CreatePoolView;
