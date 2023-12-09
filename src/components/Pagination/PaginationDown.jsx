/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import AppContext from '../../context/AppContext';

function PaginationDown() {
  const { pagination, setPagination } = useContext(AppContext);

  const handlePaginationDown = () => {
    if (pagination !== 1) {
      setPagination((prevPagination) => prevPagination - 1);
    }
  };

  return (
    <div className="col-1 col-md-3 d-flex justify-content-end">
      <i
        className={`fa-solid fa-chevron-left fs-1  ${
          pagination === 1
            ? 'cursor-default text-grey neon-reverse'
            : 'cursor-pointer text-light pagination-down neon'
        }`}
        onClick={() => handlePaginationDown(pagination)}
      />
    </div>
  );
}

export default PaginationDown;
