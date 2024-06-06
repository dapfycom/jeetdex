import CreatePoolsContainer from './CreatePoolsContainer';
const CreatePoolView = () => {
  return (
    <div>
      <div className='max-h-[650px] overflow-auto'>
        <div className='flex flex-col items-center text-center mt-5'>
          <CreatePoolsContainer />
        </div>
      </div>
    </div>
  );
};

export default CreatePoolView;
