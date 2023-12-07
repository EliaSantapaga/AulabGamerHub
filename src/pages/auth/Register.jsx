import supabase from '../../supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Space from '../../components/Space';
import LeafDecoration from '../../components/Decorations/LeafDecoration';

//* VALIDATION FORM
const schemaValidation = Yup.object({
  // name: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(30, 'Too Long!')
  //   .required('Required'),
  // last_name: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(30, 'Too Long!')
  //   .required('Required'),
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Must match')
    .required('Required'),
});

function Register() {
  // const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleRegister = async (event) => {
  //   event.preventDefault();

  //   const { username, email, password } = Object.fromEntries(
  //     new FormData(event.currentTarget)
  //   );

  //   let { error } = await signUp({
  //     email, //* Valore che arriva dal campo email del form
  //     password, //* Valore che arriva dal campo password del form
  //     options: {
  //       data: {
  //         username,
  //       },
  //     },
  //   });

  //   if (error) {
  //     alert(error.error_description || error.message);
  //   } else {
  //     navigate("./profile");
  //   }
  // };

  // const handleRegister = async (event) => {
  //   event.preventDefault();
  //   const registerForm = event.currentTarget;
  //   const { username, email, password } = Object.fromEntries(
  //     new FormData(registerForm)
  //   );
  //   try {
  //     let { error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         data: {
  //           username,
  //         },
  //       },
  //     });
  //     if (error) {
  //       alert(error.error_description || error.message);
  //     } else {
  //       registerForm.reset();
  //       navigate("/profile");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleRegisterFormik = async (values) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            username: values.username,
          },
        },
      });
      if (error) {
        // eslint-disable-next-line no-alert
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
              className="pb-2 text-center text-white shadow-pink ff-cinzel"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              Sign Up
            </h1>
          </div>
          <LeafDecoration />
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-5 mb-5 text-white" id="Register">
            {/* <form onSubmit={handleRegister}>
                

                <div className="mb-3">
                  <label htmlFor="registerName" className="form-label">
                    Username
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="TarnishedSamurai69"
                    // onChange={(event) => setUsername(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="registerEmail" className="form-label">
                    E-mail
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="nome.cognome@example.com"
                    // onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="registerPassword" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Scrivi una password sicura"
                    // onChange={(event) => setPassword(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="PasswordConfirm" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    name="password_confirm"
                    type="password"
                    id="password_confirm"
                    className="form-control"
                    placeholder="Riscrivi la tua password"
                  />
                </div>

                <div className="center-flex">
                  <button
                    type="submit"
                    className="cardbutton btn btn-prezzo ff-cinzel d-flex align-items-center justify-content-center text-white linkCard mt-4"
                  >
                    Sign Up
                  </button>

                  <Link className="text-white ff-cinzel mt-3" to="/login">
                    If you already have an account, click here to log in
                  </Link>
                </div>
              </form> */}

            {/*//* VALIDATION - INITIAL VALUES  */}
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirm_password: '',
              }}
              validationSchema={schemaValidation}
              onSubmit={(values) => {
                handleRegisterFormik(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  {/* //* USERNAME -----------------------------------*/}
                  {errors.username && touched.username ? (
                    <div className="mb-3">
                      <label
                        htmlFor="username"
                        className="form-label text-danger"
                      >
                        Username
                      </label>
                      <Field
                        name="username"
                        type="text"
                        className="form-control box-shadow-danger"
                        placeholder="TarnishedSamurai69"
                      />
                      <div className="text-danger mt-2">{errors.username}</div>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <Field
                        name="username"
                        type="text"
                        className="form-control focus-shadow"
                        placeholder="TarnishedSamurai69"
                      />
                    </div>
                  )}

                  {/* //* E-MAIL -----------------------------------*/}
                  {errors.email && touched.email ? (
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label text-danger">
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
                      <label htmlFor="email" className="form-label">
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

                  <div className="row">
                    {/* //* PASSWORD -----------------------------------*/}
                    {errors.password && touched.password ? (
                      <div className="col-12 col-md-6 mb-3">
                        <label
                          htmlFor="password"
                          className="form-label text-danger"
                        >
                          Password
                        </label>

                        <Field
                          name="password"
                          type="password"
                          className="form-control box-shadow-danger"
                          placeholder="HardPassword2023!"
                        />
                        <div className="text-danger mt-2">
                          {errors.password}
                        </div>
                      </div>
                    ) : (
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <Field
                          name="password"
                          type="password"
                          className="form-control focus-shadow"
                          placeholder="HardPassword2023!"
                        />
                      </div>
                    )}

                    {/* //* CONFIRM PASSWORD -----------------------------------*/}
                    {errors.confirm_password && touched.confirm_password ? (
                      <div className="col-12 col-md-6 mb-3">
                        <label
                          htmlFor="confirm_password"
                          className="form-label text-danger"
                        >
                          Confirm Password
                        </label>
                        <Field
                          name="confirm_password"
                          type="password"
                          className="form-control box-shadow-danger"
                          placeholder="HardPassword2023!"
                        />
                        <div className="text-danger mt-2">
                          {errors.confirm_password}
                        </div>
                      </div>
                    ) : (
                      <div className="col-12 col-md-6 mb-3">
                        <label
                          htmlFor="confirm_password"
                          className="form-label"
                        >
                          Confirm Password
                        </label>
                        <Field
                          name="confirm_password"
                          type="password"
                          className="form-control focus-shadow"
                          placeholder="HardPassword2023!"
                        />
                      </div>
                    )}
                  </div>

                  {/* //* BUTTON SIGN UP -----------------------------------*/}
                  <div className="center-flex">
                    <button type="submit" className="game-list-button mt-4">
                      Sign Up
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
