import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Space from '../../components/Layout/Space';
import LeafDecoration from '../../components/Decorations/LeafDecoration';
import supabase from '../../supabase/client';
import AuthLayout from '../../layout/AuthLayout';
import Avatar from '../../components/Avatar';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { session } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  console.log(username);

  //* VALIDATION FORM --------------------------------------------
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
          setFirstName(data.first_name);
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
      <div className="container">
        <Space />
        <div className="row mb-5">
          <div className="col-12 d-flex justify-content-center pt-5 pb-2 overflow-hidden">
            <h1
              className="pb-2 text-center text-white shadow-neon fs-0 ff-cinzel page-title"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-anchor-placement="center-bottom"
            >
              Account Settings
            </h1>
          </div>
          <LeafDecoration />
        </div>

        <div className="row center-flex mb-4">
          <div className="col-11 col-md-10 account-settings">
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
                  <div className="row d-flex align-items-center p-2">
                    <div className="col-12 col-lg-4 center-flex pt-4 mt-2 mb-3 avatar-settings">
                      <div className="center-flex avatar-anim">
                        {/*//* PROFILE PIC --------------------------------- */}
                        <Avatar
                          url={avatar_url}
                          size={150}
                          onUpload={(event, url) => {
                            updateProfile(event, url);
                          }}
                        />
                      </div>
                    </div>

                    {/*//* PROFILE INFO ------------------------------------- */}
                    <div className="col-12 col-lg-8 py-3 py-lg-5 mt-md-0 px-3 px-md-5 account-info">
                      <div className="account-info-anim">
                        <h4 className="text-center shadow-neon mb-4">
                          Edit your profile information
                        </h4>
                        <div className="row">
                          {/*//* FIRST NAME -----------------------------------*/}
                          <div className="col-12 col-md-6 mb-3">
                            <div class="custom-box text-white rounded">
                              <label
                                className="custom-text shadow-neon"
                                htmlFor="first_name"
                              >
                                First Name
                              </label>

                              <Field
                                name="first_name"
                                type="text"
                                className="form-field text-white"
                                placeholder="Ranni"
                                value={first_name || ''}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </div>
                          </div>

                          {/* //* LAST NAME -----------------------------------*/}
                          <div className="col-12 col-md-6 mb-3">
                            <div class="custom-box text-white rounded">
                              <label
                                className="custom-text shadow-neon"
                                htmlFor="last_name"
                              >
                                Last Name
                              </label>

                              <Field
                                name="last_name"
                                type="text"
                                className="form-field text-white"
                                placeholder="Ranni"
                                value={last_name || ''}
                                onChange={(e) => setLastName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          {/*//* E-MAIL ------------------------------------- */}
                          <div className="col-12 col-lg-6 mb-3">
                            <div class="custom-box text-white rounded">
                              <label
                                className="custom-text shadow-neon"
                                htmlFor="email"
                              >
                                E-mail
                              </label>

                              <Field
                                name="email"
                                id="email"
                                type="text"
                                value={session.user.email}
                                disabled
                                className="form-field text-white"
                              />
                            </div>
                          </div>

                          {/* //* USERNAME -----------------------------------*/}
                          <div className="col-12 col-lg-6 mb-3">
                            <div class="custom-box text-white rounded">
                              <label
                                className="custom-text shadow-neon"
                                htmlFor="username"
                              >
                                Username
                              </label>

                              <Field
                                name="username"
                                type="text"
                                className="form-field text-white"
                                value={username || ''}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-12 center-flex mt-4">
                          {loading ? (
                            <button
                              className="game-list-button block primary"
                              type="submit"
                              disabled={loading}
                            >
                              Loading...
                            </button>
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
