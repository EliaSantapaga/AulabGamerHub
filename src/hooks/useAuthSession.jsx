// import { useState, useEffect } from "react";

function useAuthSession() {
  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   SupabaseAuthClient.auth.hetSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });

  //   return () => sunscription.unsubscribe();
  // }, []);
}

export default useAuthSession;
