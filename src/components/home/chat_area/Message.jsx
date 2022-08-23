import { useState } from 'react';
import './Message.css';

function Message({ from, message }) {

  const [user, setUser] = useState(localStorage.getItem('username'));

  return (
    <div className={ 'message-container' + (from === user ? ' from-me' : ' from-other') } 
    data-from={ from }>
      <div className={ 'message' + (from === user ? ' from-me' : ' from-other')}>
        <span>{ message }</span>
      </div>
      <span className='message-from'>{ from === user ? 'You' : from }</span>
    </div>
  );
}

export default Message;
