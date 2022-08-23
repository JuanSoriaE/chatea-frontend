import './Home.css';
import ChatsList from './home/ChatsList';
import ChatingArea from './home/ChatingArea';
import ChatInfo from './home/ChatInfo';
import Menu from './home/Menu';
import NewChat from './home/NewChat';
import StartChatSvg from './../assets/start-chat-svg.svg';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  extraHeaders: {'access-token': localStorage.getItem('access-token')}
});

function Home({ setAuth }) {
  const url = 'http://localhost:5000/';

  const [show_chat_info, setShowChatInfo] = useState(true);
  const [chats, setChats] = useState([]);

  const getChatData = () => {
    const token = localStorage.getItem('access-token');
    
    axios({
      method: 'get',
      url: url + 'chats',
      headers: {
        'access-token': token
      }
    }).then(res => {
      console.log(res.data);
      setChats(res.data);
    }).catch(err => {
      console.log(err);
    });
  };

  useEffect(() => {
    getChatData();
  }, []);

  const NoChatSelected = () => (
    <div className='main-no-chat-selected'>
      <h1>Hello again!</h1>
      <img src={ StartChatSvg } className='start-chat-svg' />
      <h4>Connect with your friends and family thanks to CHATEA.</h4>
      <p>Click on one of the Chats of the left Chats List to start a conversation.</p>
    </div>
  );

  const switchContent = () => {
    switch (useLocation().pathname) {
      case '/':
        return <NoChatSelected />
      case '/new':
        return <NewChat />
      default:
        return <>
        <ChatingArea show_chat_info={ show_chat_info } setShowChatInfo={ setShowChatInfo } socket={ socket } />
        <ChatInfo show_chat_info={ show_chat_info } setShowChatInfo={ setShowChatInfo } socket={ socket } />
      </>
    }
  };

  return (
    <div className='main-chats-page'>
      <Menu setAuth={ setAuth } />
      <ChatsList chats={ chats } socket={ socket } />
      {/* { useLocation().pathname === '/' ? <NoChatSelected /> : 
      (
        <>
          <ChatingArea show_chat_info={ show_chat_info } setShowChatInfo={ setShowChatInfo } socket={ socket } />
          <ChatInfo show_chat_info={ show_chat_info } setShowChatInfo={ setShowChatInfo } />
        </>
      ) } */}
      {
        switchContent()
      }
    </div>
  );
}

export default Home;
