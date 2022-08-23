import './ChatInfo.css';
import Modal from './chat_info/Modal';
import { IoMdClose } from 'react-icons/io';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoIosVideocam } from 'react-icons/io';
import { BsDownload } from 'react-icons/bs';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import ConfirmAlert from './alerts/ConfirmAlert';

function ChatInfo({ show_chat_info, setShowChatInfo, socket }) {

  const { public_id } = useParams();
  let navigate = useNavigate();

  const url = 'http://localhost:5000/';
  const token = localStorage.getItem('access-token');

  const friends = JSON.parse(localStorage.getItem('friends'));
  const username = localStorage.getItem('username');

  const [chat, setChat] = useState({});
  const [user, setUser] = useState(localStorage.getItem('username'));
  const [add_member_modal, setAddMemberModal] = useState(false);
  const [kick_member_modal, setKickMemberModal] = useState(false);
  const [leave_chat_modal, setLeaveChatModal] = useState(false);

  const getChatData = () => {

    axios({
      method: 'get',
      url: url + `chat/${public_id}`,
      headers: {
        'access-token': token
      }
    }).then(res => {
      console.log(res.data);
      setChat(res.data);
    }).catch(err => {
      console.log(err);
    });
  };

  const shared_file = (num) => (
    <div className='shared-file'>
      <img src={ `https://picsum.photos/300/200?random=${num}` } className='shared-file-img' />
      <div className='shared-file-info'>
        <span className='shared-file-name'>Image1.jpg</span>
        <div className='shared-file-details-container'>
          <span className='shared-file-date'>1 July 2021</span>
          <div className='dot'></div>
          <span className='shared-file-size'>249.3KB</span>
        </div>
      </div>
      <BsDownload className='download-icon' />
    </div>
  );

  const getNameToDisplay = () => {
    if (chat.is_group) {
      return chat.members.join(', ');
    } else {
      if (chat.members[0] === user) return chat.members[1];

      return chat.members[0];
    }
  };

  const addMemberAction = () => {
    const selected_friend = document.getElementById('modal-select').value;

    axios({
      method: 'post',
      url: url + `addMember/${public_id}/${selected_friend}`,
      headers: {
        'access-token': token
      }
    }).then(res => {
      console.log(res.data);
      socket.emit('chat change', {public_id, message: `${username} added ${selected_friend} to the chat.`});
    }).catch(err => {
      console.log(err);
    });

    setAddMemberModal(false);
  };

  const kickMemberAction = () => {
    const selected_friend = document.getElementById('modal-select').value;

    axios({
      method: 'post',
      url: url + `kickMember/${public_id}/${selected_friend}`,
      headers: {
        'access-token': token
      }
    }).then(res => {
      console.log(res.data);
      socket.emit('chat change', {public_id, message: `${username} kicked ${selected_friend} to the chat.`});
    }).catch(err => {
      console.log(err);
    });

    setKickMemberModal(false);
  };

  const leaveChatAction = () => {
    axios({
      method: 'post',
      url: url + `leaveChat/${public_id}`,
      headers: {
        'access-token': token
      }
    }).then(res => {
      console.log(res.data);
      socket.emit('chat change', {public_id, message: `${username} left the chat.`});
      navigate('/');
    }).catch(err => {
      console.log(err);
    });

    setLeaveChatModal(false);
  };

  useEffect(() => {
    getChatData();

    if (window.matchMedia('(max-width: 600px)').matches) setShowChatInfo(false);
  }, [public_id]);

  return (
    <div className='main-chat-info' id='main-chat-info' style={ {
      display: show_chat_info ? 'block' : 'none'
    } }>
      <div className='chat-info-close-button-container'>
        <IoMdClose className='main-info-close-button' 
        onClick={ () => setShowChatInfo(false) } />
      </div>
      <div className='chat-info-main-info'>
        <img src={ chat.is_group ? 'chat.img_url' : '(getIndexOfFriend() === 0 ? chat.members[0].img_url : chat.members[1].img_url)' } 
        className='main-info-img' />
        <span className='main-info-name' style={ {fontSize: chat.is_group && '16px'} }>{ chat.members && getNameToDisplay() }</span>
        {/* <span className='main-info-email'>email@email.com</span> */}
        <div className='main-info-icons-container'>
          <div className='main-info-icon-button'>
            <BsTelephoneFill className='main-info-icon' />
          </div>
          <div className='main-info-icon-button'>
            <IoIosVideocam className='main-info-icon' />
          </div>
        </div>
      </div>
      <div className='chat-info-shared-files'>
        <span className='shared-files-title'>SHARED FILES</span>
        <div className='shared-files-container'>
          { shared_file(1) }
        </div>
      </div>
      <div className='chat-info-actions-container'>
        {
          chat.is_group && (
            <>
              <button onClick={ () => setAddMemberModal(true) }>Add Member</button>
              <button onClick={ () => setKickMemberModal(true) }>Kick Member</button>
            </>
          )
        }
        
        <button onClick={ () => setLeaveChatModal(true) } style={ {color: '#b03030', fontWeight: '600'} }>Leave Chat</button>
        {
          add_member_modal && (
            <Modal title='Add Member' action={ addMemberAction } friends={ friends.filter(friend => !chat.members.includes(friend)) } message='Choose the friend you want to add...' setModal={ setAddMemberModal } />
          )
        }
        {
          kick_member_modal && (
            <Modal title='Kick Member' action={ kickMemberAction } friends={ chat.members.filter(member => member !== user) } message='Choose the member you want to kick...' setModal={ setKickMemberModal } />
          )
        }
        {
          leave_chat_modal && <ConfirmAlert title='Are you sure to leave the chat?' message='Once you leave the chat, you will not be available to interact with it.' action={ leaveChatAction } setModal={ setLeaveChatModal } />
        }
        
      </div>
    </div>
  );
}

export default ChatInfo;
