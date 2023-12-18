import { useState, useEffect, useRef, useContext } from 'react';
import supabase from '../../supabase/client';
import AuthContext from '../../context/AuthContext';
import useProfile from '../../hooks/useProfile';
import getProfileImg from '../../utils/getProfileImg';
import formatMessageDate from '../../utils/formatMessageDate';

function Messages({ game }) {
  const { session } = useContext(AuthContext);
  const { profile } = useProfile();
  const [chat, setChat] = useState([]);
  const [avatars, setAvatars] = useState();
  const chatRef = useRef(null);

  const getMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*,  profile: profiles(*)')
      .eq('game_id', game.id);
    if (error) {
      console.error('Errore durante il recupero dei messaggi:', error.message);
    } else {
      console.log(data);
      setChat(data);
    }
  };

  //* USERS' AVATAR ------------------------------------------
  const getAvatar = async () => {
    let { profiles, error } = await supabase
      .from('profiles')
      .select('avatar_url');

    if (error) {
      console.error('Errore durante il recupero dei messaggi:', error.message);
    } else {
      console.log(profiles);
      setAvatars(profiles);
    }
  };

  getAvatar();

  console.log(avatars);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data...');
      await getMessages();
      const subscription = supabase
        .channel('messages')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
          },
          () => getMessages()
        )
        .subscribe();
      return () => {
        subscription.unsubscribe();
      };
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div>
      <div className="messages" ref={chatRef}>
        {chat &&
          chat.map((message) => (
            <div
              key={message.id}
              className={`row my-3 ${
                session.user.id == message.profile_id
                  ? 'd-flex justify-content-end'
                  : ''
              }`}
            >
              <div className="col-11 col-md-9 mx-2 ms-md-2">
                {session.user.id == message.profile_id ? (
                  //* SESSION USER MESSAGES ----------------------------
                  <div className="row m-0">
                    <div className="col-10 p-0 ">
                      <div className="py-2 px-3 session-user-message">
                        <p className="shadow-neon my-1">
                          {message.profile.username}
                        </p>

                        <span className="ff-gotu">{message.content}</span>
                        <span className="fs-7 d-flex align-items-end justify-content-end mt-2">
                          <span>{formatMessageDate(message.created_at)}</span>
                        </span>
                      </div>
                    </div>
                    <div className="col-2 d-flex align-items-end justify-content-end p-0 pe-0 pe-md-2">
                      <div
                        className="avatar-chat-box rounded-pill overflow-hidden center-flex"
                        style={{
                          backgroundImage: `url('${
                            profile && getProfileImg(message.profile.avatar_url)
                          }')`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  //* OTHER USERS MESSAGES ---------------------------- *
                  <div className="row m-0">
                    <div className="col-2 p-0 pe-0">
                      <div
                        className="avatar-chat-box rounded-pill overflow-hidden center-flex"
                        style={{
                          backgroundImage: `url('${
                            profile && getProfileImg(message.profile.avatar_url)
                          }')`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                        }}
                      />
                    </div>
                    <div className="col-10 p-0 ">
                      <div className="py-2 px-3 other-user-message">
                        <p className="shadow-neon my-1">
                          {message.profile.username}
                        </p>

                        <span className="ff-gotu">{message.content}</span>
                        <span className="fs-7 d-flex align-items-end justify-content-end mt-2">
                          <span>{formatMessageDate(message.created_at)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Messages;
