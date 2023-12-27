import { Link, useNavigate } from 'react-router-dom';
import Space from '../../components/Layout/Space';
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
      <div className="container">
        <Space />
        <div className="row">
          <div className="col-12 d-flex justify-content-center pt-5 pb-2 overflow-hidden">
            <h1
              className="pb-2 text-center text-white shadow-neon fs-0 ff-cinzel page-title"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              Login
            </h1>
          </div>
          <LeafDecoration />
        </div>

        <div className="row center-flex my-5">
          <div className="col-11 col-md-10 account-settings">
            <div className="row d-flex align-items-center py-3">
              <div
                className="col-12 col-lg-4 center-flex avatar-settings py-4"
                id="LoginSocial"
              >
                <div className="avatar-anim">
                  <h4 className="text-center text-white shadow-neon ff-cinzel fs-3">
                    Sign in here
                  </h4>

                  <button
                    type="submit"
                    className="ff-cinzel d-flex align-items-center justify-content-center text-white linkCard mt-4 btn-github"
                  >
                    <i className="fa-brands fa-github me-3"></i> Login with
                    Github
                  </button>

                  <button
                    type="submit"
                    className="ff-cinzel d-flex align-items-center justify-content-center text-white linkCard mt-4 btn-discord"
                    onClick={handleLoginWithDiscord}
                  >
                    <i className="fa-brands fa-discord me-3"></i>Login with
                    Discord
                  </button>

                  <button
                    type="submit"
                    className="ff-cinzel d-flex align-items-center justify-content-center text-white linkCard mt-4 btn-google"
                  >
                    <i className="fa-brands fa-google me-3"></i>Login with
                    Google
                  </button>
                </div>
              </div>

              <div className="col-12 col-lg-8 center-flex overflow-hidden">
                <div
                  id="LoginEmail"
                  className="col-10 text-white pt-4 account-info-anim"
                >
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
                          <div className="col-12 mb-3">
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
                              placeholder="Insert your e-mail"
                            />
                            <div className="text-danger mt-2">
                              {errors.email}
                            </div>
                          </div>
                        ) : (
                          <div className="col-12 mb-3">
                            <label
                              htmlFor="registerName"
                              className="form-label"
                            >
                              E-mail
                            </label>

                            <Field
                              name="email"
                              type="email"
                              className="form-control focus-shadow"
                              placeholder="Insert your e-mail"
                            />
                            <div className="text-danger mt-2">
                              {errors.email}
                            </div>
                          </div>
                        )}

                        {/* //* PASSWORD ----------------------------------- */}
                        {errors.password && touched.password ? (
                          <div className="col-12 mb-3">
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
                            <div className="text-danger mt-2">
                              {errors.password}
                            </div>
                          </div>
                        ) : (
                          <div className="col-12 mb-3">
                            <label
                              htmlFor="registerName"
                              className="form-label"
                            >
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
                          <button
                            type="submit"
                            className="game-list-button mt-4"
                          >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
