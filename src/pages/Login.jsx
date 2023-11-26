import { Link } from "react-router-dom";
import Space from "../components/Space";
import AuthLayout from "../layout/AuthLayout";

function Login() {
  return (
    <AuthLayout>
      <div className="container mb-5">
        <Space />
        <div className="row mt-5 mb-5">
          <div className="col-12 d-flex justify-content-center">
            <h1
              className="pb-2 border-bottom text-center text-white shadow-pink ff-orbitron"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              Esegui il login
            </h1>
          </div>
        </div>
        <div className="row justify-content-between">
          <div
            id="LoginEmail"
            className="col-12 col-md-5 align-items-center justify-content-center text-white"
          >
            <form>
              <div className="mb-3">
                <label htmlFor="registerEmail" className="form-label">
                  E-mail
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="registerEmail"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="registerPassword" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="registerPassword"
                />
              </div>
              <div className="d-flex align-items-center justify-content-around">
                <button
                  type="submit"
                  className="cardbutton btn btn-prezzo ff-orbitron d-flex align-items-center justify-content-center text-white linkCard mt-4"
                >
                  Login
                </button>
              </div>
            </form>

            <div className="col-12 align-items-center justify-content-center text-white text-center mt-4">
              <Link className="text-white" to="/register">
                <p className=" ff-orbitron">
                  Se non hai un account, fai click qui per registrarti
                </p>
              </Link>
            </div>
          </div>

          <div
            id="LoginSocial"
            className="col-12 col-md-5 center-flex text-white"
          >
            <h3 className="text-center text-white shadow-pink ff-orbitron fs-2 mt-3 mt-md-none">
              Oppure
            </h3>
            <button
              type="submit"
              className="cardbutton btn ff-orbitron d-flex align-items-center justify-content-center text-white linkCard mt-4 btn-social-google"
            >
              <i className="fa-brands fa-google me-3"></i>Entra con Google
            </button>

            <button
              type="submit"
              className="cardbutton btn ff-orbitron d-flex align-items-center justify-content-center text-white linkCard mt-4 btn-social-discord"
            >
              <i className="fa-brands fa-discord me-3"></i>Entra con Discord
            </button>

            <button
              type="submit"
              className="cardbutton btn ff-orbitron d-flex align-items-center justify-content-center text-white linkCard mt-4 btn-social-steam"
            >
              <i className="fa-brands fa-steam me-3"></i> Entra con Steam
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
