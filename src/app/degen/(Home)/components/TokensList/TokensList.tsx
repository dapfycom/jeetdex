import Coins from './Coins/Coins';
import SearchBar from './Searchbar/Searchbar';

const TokensList = async () => {
  return (
    <div>
      <SearchBar />

      {/* <Settings /> */}

      <Coins />
    </div>
  );
};

export default TokensList;
