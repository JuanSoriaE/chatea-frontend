import './ChatingArea.css';
import Message from './chat_area/Message';
import TypingArea from './chat_area/TypingArea';
import Notification from './Notification';
import { AiFillInfoCircle } from 'react-icons/ai';
import { IoSettingsSharp } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ChatingArea({ show_chat_info, setShowChatInfo, socket }) {

  const { public_id } = useParams();

  const url = 'http://localhost:5000/';

  const [chat, setChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('username'));
  const [noti_info, setNotiInfo] = useState({});
  const [show_noti, setShowNoti] = useState(false);
  const message_end_reference = useRef(null);

  useEffect(() => {
    getChatData();
  }, [public_id]);

  const getChatData = () => {
    const token = localStorage.getItem('access-token');
    
    axios({
      method: 'get',
      url: url + `chat/${public_id}`,
      headers: {
        'access-token': token
      }
    }).then(res => {
      console.log(res.data);
      setChat(res.data);
      setMessages(res.data.chat_history);
    }).catch(err => {
      console.log(err);
    });
  }

  const handleClick = () => {
    if (window.matchMedia('(max-width: 600px)').matches) {
      document.getElementById('main-chat-info').style.animation = 'grow-chat-info-mobile 0.2s';
    } else {
      document.getElementById('main-chat-info').style.animation = 'grow-chat-info 0.2s';
    }

    setShowChatInfo(!show_chat_info);
  };

  const getNameToDisplay = () => {
    if (chat.is_group) return chat.group_name;

    if (chat.members[0] === user) return chat.members[1];

    return chat.members[0];
  };

  const getIndexOfFriend = () => {
    if (chat.members[0] === user) return chat.members[1];
    return chat.members[0];
  };

  const displayNoti = async (data) => {
    setNotiInfo(data);
    setShowNoti(true);
  };

  // Socket
  socket.on('new message', data => {
    if (data.public_id === public_id) {
      setMessages([...messages, data.message_data]);
    } else {
      displayNoti(data);
      console.log('Noti');
      console.log(data.message_data);
    }
  });

  socket.on('chat change', data => {
    console.log(data);

    if (data.public_id === public_id) {
      let chating_area = document.getElementById('chating-area-id');
      
    } else {
    }
    
  });

  const emitMessage = (message_data) => {
    let data = {
      public_id,
      message_data
    };

    socket.emit('new message', data);
  };

  return (
    <div className="main-chating-area" id='main-chating-area' style={ {
      width: show_chat_info ? '50%' : '77%'
    } }>
      
      {
        (show_noti && public_id !== noti_info.public_id) && <Notification data={ noti_info } setShowNoti={ setShowNoti } />
      }

      <div className='chat-header-container'>
        <div className='chat-header-info-container'>
          <h3 className='chat-header-title'>
            { chat.members && getNameToDisplay() }
          </h3>
          <div className='dot'></div>
          {
            !chat.is_group ? <img src={ 'chat.members[getIndexOfFriend()].img_url' } className='chat-row-img chat-header-img' /> : (
              chat.members.map((member, i) => <img key={ i } src={ 'member.img_url' } className='chat-row-img chat-header-img' />)
            )
          }
        </div>
        <div className='chat-settings-container'>
          <AiFillInfoCircle className='chat-settings-icon' />
          <IoSettingsSharp className='chat-settings-icon' id='chat-settings-icon' />
          <BsThreeDotsVertical className='chat-settings-icon' 
          onClick={ () => handleClick() } />
        </div>
      </div>
      <div className='chating-area'>
        <div id='chating-area-id'>
          <div className='messages-info-container'>
            <span className='messages-info'>We make sure to secure your data by verifying each sender information.</span>
          </div>
          {
            messages && (
              messages.map((message, i) => <Message key={ i } from={ message.from } message={ message.message } />)
            )
          }
        </div>
        <div ref={ message_end_reference }></div>
      </div>
      <TypingArea messages={ messages } setMessages={ setMessages } profile_img_url={ 'getIndexOfFriend() === 1 ? chat.members[0].img_url : chat.members[1].img_url' } message_end_reference={ message_end_reference } emitMessage={ emitMessage } />
    </div>
  );
}

export default ChatingArea;
