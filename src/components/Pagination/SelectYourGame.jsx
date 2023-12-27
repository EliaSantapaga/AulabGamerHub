import Filters from '../Filters/Filters';
import PaginationDown from './PaginationDown';
import PaginationUp from './PaginationUp';

function SelectYourGame() {
  return (
    <>
      <div className="row my-3 my-lg-4 d-flex justify-content-center">
        <Filters />
      </div>

      <div className="row mb-3 search-pagination">
        <PaginationDown />
        <div className="col-10 col-md-6 text-center ">
          <h3 className=" ff-cinzel text-white fs-1 shadow-neon">
            Select your game!
          </h3>
        </div>

        <PaginationUp />
      </div>
    </>
  );
}

export default SelectYourGame;
