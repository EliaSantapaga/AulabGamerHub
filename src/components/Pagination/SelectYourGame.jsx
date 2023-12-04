import PaginationDown from './PaginationDown';
import PaginationUp from './PaginationUp';

function SelectYourGame() {
  return (
    <div className="row mb-3">
      <PaginationDown />
      <div className="col-10 col-md-6 text-center ">
        <div>
          <h3 className=" ff-cinzel text-white fs-1 shadow-neon">
            Select your game!
          </h3>
        </div>
      </div>

      <PaginationUp />
    </div>
  );
}

export default SelectYourGame;
