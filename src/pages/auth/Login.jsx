import { Link, useNavigate } from 'react-router-dom';
import Space from '../../components/Space';
import AuthLayout from '../../layout/AuthLayout';
import supabase from '../../supabase/client';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import LeafDecoration from '../../components/Decorations/LeafDecoration';

//* VALIDATION FORM -----------------------------------
const schemaValidation = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Password too short').required('Required'),
});

function Login() {
  const navigate = useNavigate();

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   const loginForm = event.currentTarget;
  //   const { email, password } = Object.fromEntries(new FormData(loginForm));
  //   try {
  //     let { error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password,
  //     });
  //     if (error) {
  //       alert(error.error_description || error.message);
  //     } else {
  //       loginForm.reset();
  //       navigate("/profile");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLoginFormik = async (values) => {
    try {
      let { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        alert(error.error_description || error.message);
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWithDiscord = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
      });

      if (error) {
        alert(error.error_description || error.message);
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-page container px-3">
        <Space />
        <div className="row my-md-5 my-4">
          <div className="col-12 d-flex justify-content-center">
            <h1
              className="pb-2 text-center text-white shadow-neon fs-0 ff-cinzel"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              Login
            </h1>
          </div>

          <LeafDecoration />
        </div>
        <div className="row justify-content-around">
          <div
            id="LoginEmail"
            className="col-12 col-md-5 align-items-center justify-content-center text-white"
          >
            <h3 className="text-center text-white shadow-neon ff-cinzel fs-2 mt-3 mt-md-none">
              Sign in here
            </h3>
            {/* <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="registerEmail" className="form-label">
                  E-mail
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="email"
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
                  id="password"
                />
              </div>
              <div className="d-flex align-items-center justify-content-around">
                <button
                  type="submit"
                  className="cardbutton btn btn-prezzo ff-cinzel d-flex align-items-center justify-content-center text-white linkCard mt-4"
                >
                  Login
                </button>
              </div>
            </form> */}

            {/*//* VALIDATION - INITIAL VALUES ----------------------------------- */}
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={schemaValidation}
              onSubmit={(values) => {
                handleLoginFormik(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  {/* //* E-MAIL ----------------------------------- */}
                  {errors.email && touched.email ? (
                    <div className="mb-3">
                      <label
                        htmlFor="registerName"
                        className="form-label text-danger"
                      >
                        E-mail
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="form-control box-shadow-danger"
                        placeholder="name.lastname@example.com"
                      />
                      <div className="text-danger mt-2">{errors.email}</div>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <label htmlFor="registerName" className="form-label">
                        E-mail
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="form-control focus-shadow"
                        placeholder="name.lastname@example.com"
                      />
                    </div>
                  )}

                  {/* //* PASSWORD ----------------------------------- */}
                  {errors.password && touched.password ? (
                    <div className="mb-3">
                      <label
                        htmlFor="registerName"
                        className="form-label text-danger"
                      >
                        Password
                      </label>

                      <Field
                        name="password"
                        type="password"
                        className="form-control box-shadow-danger"
                        placeholder="Insert your password"
                      />
                      <div className="text-danger mt-2">{errors.password}</div>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <label htmlFor="registerName" className="form-label">
                        Password
                      </label>
                      <Field
                        name="password"
                        type="password"
                        className="form-control focus-shadow"
                        placeholder="Insert your password"
                      />
                    </div>
                  )}

                  {/* //* BUTTON LOGIN ----------------------------------- */}
                  <div className="d-flex align-items-center justify-content-around">
                    <button type="submit" className="game-list-button mt-4">
                      Login
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="col-12 align-items-center justify-content-center text-white text-center mt-4">
              <Link className="text-white" to="/register">
                <p className="ff-cinzel">Click here to Register</p>
              </Link>
            </div>
          </div>

          <div
            id="LoginSocial"
            className="col-12 col-md-5 d-flex align-items-center flex-column text-white"
          >
            <h3 className="text-center text-white shadow-neon ff-cinzel fs-2 mt-3 mt-md-none">
              Or
            </h3>
            <button
              type="submit"
              className="ff-cinzel d-flex align-items-center justify-content-center text-white linkCard mt-4 btn-github"
            >
              <i className="fa-brands fa-github me-3"></i> Login with Github
            </button>

            <button
              type="submit"
              className="ff-cinzel d-flex align-items-center justify-content-center text-white linkCard mt-4 btn-discord"
              onClick={handleLoginWithDiscord}
            >
              <i className="fa-brands fa-discord me-3"></i>Login with Discord
            </button>

            <button
              type="submit"
              className="ff-cinzel d-flex align-items-center justify-content-center text-white linkCard mt-4 btn-google"
            >
              <i className="fa-brands fa-google me-3"></i>Login with Google
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
