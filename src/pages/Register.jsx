import { Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
// import { supabase } from "../supabase/client";

function Register() {
  // const handleRegister = async (event) => {
  //   event.preventDefault();
  //   let { data, error } = await supabase.auth.signUp({
  //     email: "someone@email.com",
  //     password: "QmrztiWEYcVIjmjFhQRL",
  //   });

  //   if (error) {
  //     alert(error.error_description || error.message);
  //   } else {
  //     console.log(data);
  //   }
  // };

  // handleRegister();

  return (
    <AuthLayout>
      <div className="text-white center-flex mb-5">
        <div className="container mt-5">
          <div className="row mt-5 mb-5">
            <div className="col-12 d-flex justify-content-center">
              <h1
                className="pb-2 border-bottom text-center text-white shadow-pink ff-orbitron mt-none mt-md-5"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-anchor-placement="center-bottom"
              >
                Registrati
              </h1>
            </div>
          </div>
          <div className="row justify-content-center">
            {/* <div className="col-12">
                @if (session('message'))
                    <div className="alert alert-success">
                        {{ session('message') }}
                    </div>
                @endif
            </div> */}

            <div className="col-12 col-md-5 mb-5 align-items-center justify-content-center text-white">
              <form method="POST" action="{{ route('register') }}">
                {/* @csrf */}

                <div className="mb-3">
                  <label htmlFor="registerName" className="form-label">
                    Nome Utente
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="registerName"
                  />
                </div>

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

                <div className="mb-3">
                  <label
                    htmlFor="registerPasswordConfirm"
                    className="form-label"
                  >
                    Conferma Password
                  </label>
                  <input
                    name="password_confirmation"
                    type="password"
                    className="form-control"
                    id="registerPasswordConfirm"
                  />
                </div>

                <div className="center-flex">
                  <button
                    type="submit"
                    className="cardbutton btn btn-prezzo ff-orbitron d-flex align-items-center justify-content-center text-white linkCard mt-4"
                  >
                    Registrati
                  </button>

                  <Link className="text-white  mt-3" to="/login">
                    <p className=" ff-orbitron">
                      Se hai già un account, fai click qui per accedere
                    </p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
