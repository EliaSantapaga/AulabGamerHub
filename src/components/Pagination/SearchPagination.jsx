import PaginationDown from './PaginationDown';
import PaginationUp from './PaginationUp';

const handleSearch = (event) => {
  setSearch(event.currentTarget.value);
};

function SearchPagination() {
  return (
    <div className="row mb-3">
      <PaginationDown />
      <div className="col-10 col-md-6">
        <div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 rounded-pill text-center m-0"
              type="search"
              id="search"
              placeholder="Cerca il tuo gioco..."
              aria-label="Search"
              onChange={handleSearch}
            />
          </form>
        </div>
      </div>
      <PaginationUp />
    </div>
  );
}

export default SearchPagination;
