import "./loader.css";

function PacManLoader() {
  return (
    <div className="center-flex">
      <div className="col-12 col-md-6 my-3">
        <div className="card d-flex justify-content-center text-center card-loader">
          <div className="loader">
            <div className="circles">
              <span className="one"></span>
              <span className="two"></span>
              <span className="three"></span>
            </div>
            <div className="pacman">
              <span className="top"></span>
              <span className="bottom"></span>
              <span className="left"></span>
              {/* <div className="eye"></div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PacManLoader;
