import { useState, useEffect, useRef } from 'react';
import supabase from '../../supabase/client';
import './Messages.css';

function Messages({ profile, game }) {
  const [chat, setChat] = useState([]);
  const chatRef = useRef(null);

  const getMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('game_slug', game.slug);
    if (error) {
      alert(error.message);
    } else {
      setChat(data);
    }
  };

  useEffect(() => {
    getMessages();
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
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  const formatMessageDate = (createdAt) => {
    const dateTime = new Date(createdAt);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${formattedDate} - ${formattedTime}`;
  };

  return (
    <div className="col-12 p-3 messages" ref={chatRef}>
      {chat &&
        chat.map((message) => (
          <div
            key={message.id}
            className={`col-12 ${
              profile.id == message.profile_id
                ? 'd-flex justify-content-end'
                : ''
            }`}
          >
            <div className="col-9">
              <div className="chat-message py-2 px-3 my-2">
                <p className="shadow-neon my-1">{message.profile_username}</p>

                <span className="ff-gotu">{message.content}</span>
                <span className="fs-7 d-flex align-items-end justify-content-end mt-2">
                  <span>{formatMessageDate(message.created_at)}</span>
                </span>

                <div></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Messages;
