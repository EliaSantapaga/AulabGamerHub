import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Space from '../../components/Space';
import LeafDecoration from '../../components/Decorations/LeafDecoration';
import supabase from '../../supabase/client';
import AuthLayout from '../../layout/AuthLayout';
import PacManLoader from '../../components/Loader/PacManLoader';
import Avatar from '../../components/Avatar';

export default function Settings() {
  const { session } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setfirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  //* VALIDATION FORM
  const schemaValidation = Yup.object({
    first_name: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!'),
    last_name: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!'),
    username: Yup.string().min(3, 'Too Short!').max(30, 'Too Long!'),
  });

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, first_name, last_name, avatar_url`)
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setfirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

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
              Account Settings
            </h1>
          </div>
          <LeafDecoration />
        </div>

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
            <Form onSubmit={updateProfile}>
              <div className="row">
                <div className="col-12 col-md-6 center-flex">
                  {/*//* PROFILE PIC ---------------------------------  */}
                  <Avatar
                    url={avatar_url}
                    size={150}
                    onUpload={(event, url) => {
                      updateProfile(event, url);
                    }}
                  />
                </div>

                <div className="col-6">
                  <div className="row text-white">
                    {/* //* FIRST NAME -----------------------------------*/}
                    {errors.first_name && touched.first_name ? (
                      <div className="col-12 col-md-6 mb-3">
                        <label
                          htmlFor="first_name"
                          className="form-label text-danger"
                        >
                          First Name
                        </label>
                        <Field
                          name="first_name"
                          type="text"
                          className="form-control box-shadow-danger"
                          placeholder="Ranni"
                        />
                        <div className="text-danger mt-2">{errors.name}</div>
                      </div>
                    ) : (
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="first_name" className="form-label">
                          First Name
                        </label>
                        <Field
                          name="first_name"
                          type="text"
                          className="form-control focus-shadow"
                          placeholder="Ranni"
                          value={first_name || ''}
                          onChange={(e) => setfirstName(e.target.value)}
                        />
                      </div>
                    )}

                    {/* //* LAST NAME -----------------------------------*/}
                    {errors.last_name && touched.last_name ? (
                      <div className="col-12 col-md-6 mb-3">
                        <label
                          htmlFor="last_name"
                          className="form-label text-danger"
                        >
                          Last Name
                        </label>
                        <Field
                          name="last_name"
                          type="text"
                          className="form-control box-shadow-danger"
                          placeholder="De Witch"
                        />
                        <div className="text-danger mt-2">
                          {errors.last_name}
                        </div>
                      </div>
                    ) : (
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="last_name" className="form-label">
                          Last Name
                        </label>
                        <Field
                          name="last_name"
                          type="text"
                          className="form-control focus-shadow"
                          placeholder="De Witch"
                          value={last_name || ''}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="row text-white">
                    {/*//* E-MAIL ------------------------------------- */}
                    <div className="col-12 col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        E-mail
                      </label>
                      <Field
                        name="email"
                        id="email"
                        type="text"
                        value={session.user.email}
                        disabled
                        className="form-control focus-shadow"
                      />
                    </div>

                    {/* //* USERNAME -----------------------------------*/}
                    {errors.username && touched.username ? (
                      <div className="col-12 col-md-6 mb-3">
                        <label
                          htmlFor="username"
                          className="form-label text-danger"
                        >
                          Username
                        </label>
                        <Field
                          name="username"
                          id="username"
                          type="text"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-control box-shadow-danger"
                        />
                        <div className="text-danger mt-2">
                          {errors.username}
                        </div>
                      </div>
                    ) : (
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="username" className="form-label">
                          Username
                        </label>
                        <Field
                          name="username"
                          id="username"
                          type="text"
                          required
                          value={username || ''}
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-control focus-shadow"
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-12 center-flex mt-4">
                    {loading ? (
                      <PacManLoader />
                    ) : (
                      <button
                        className="game-list-button block primary"
                        type="submit"
                        disabled={loading}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
}
