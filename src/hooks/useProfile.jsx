import { useState, useEffect, useContext } from 'react';
import supabase from '../supabase/client';
import AuthContext from '../context/AuthContext';

function useProfile() {
  const { session } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          //* Mi prendo user da session, quindi session.user.id
          .eq('id', session.user.id, 'username', session.user.name)
          .single();
        if (error) {
          console.warn(error);
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    getProfile();
  }, [session]);

  // useEffect(() => {
  //   const getFav = async () => {
  //     const { data, error } = await supabase
  //       .from('profile')
  //       .select('*, favorites: favorites(*)')
  //       .eq('id', profile.id)
  //       .single();

  //     if (error) {
  //       alert(error.message);
  //     } else {
  //       console.log(data);
  //     }
  //   };
  //   getFav();
  // }, []);

  console.log(profile);

  return {
    profile,
    loading,
  };
}

export default useProfile;
