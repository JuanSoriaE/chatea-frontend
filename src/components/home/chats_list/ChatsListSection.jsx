import './ChatsListSection.css';
import ChatRow from './ChatRow';
import { useState } from 'react';

function ChatsListSection({ section_name, chats }) {

  const [user, setUser] = useState(localStorage.getItem('username'));

  return (
    <div className='chats-list-section'>
      <div className='chats-list-section-header-container'>
        <span className='chats-list-section-header'>{ section_name }</span>
      </div>
      <div className='chats-rows-container'>
        { chats.map(chat => 
          <ChatRow key={ chat.public_id } chat={ chat } user={ user } public_id={ chat.public_id } />
        ) }
      </div>
    </div>
  );
}

export default ChatsListSection;
