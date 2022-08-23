import './TypingArea.css';
import { RiSendPlaneFill } from 'react-icons/ri';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import Picker from 'emoji-picker-react';
import { useEffect, useState } from 'react';

function TypingArea({ messages, setMessages, profile_img_url, message_end_reference, emitMessage }) {

  const [user, setUser] = useState(localStorage.getItem('username'));
  const [show_picker, setShowPicker] = useState(false);
  const [emoji_picker_style, setEmojiPickerStyle] = useState({});

  const onEmojiClick = (e, emojiObject) => {
    let message_input = document.getElementById('message-input');

    message_input.value += emojiObject.emoji;
    message_input.focus();
  };

  // Submit on Enter press
  const handleKeyDown = e => {
    // Hide Emoji Picker on Escape
    if (e.code === 'Escape' && show_picker) return setShowPicker(false);

    if (e.code === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      let message = e.target.value.trim();

      if (message) {
        let data = {
          from: user, // . to test others message
          message
        };

        emitMessage(data);
        e.target.value = '';
      }
    }
  };

  // Submit on send button click
  const handleClick = e => {
    e.preventDefault();
    let message_input = document.getElementById('message-input');
    let message = message_input.value.trim();

    if (message) {
      let data = {
        from: user,
        message
      };

      emitMessage(data);
      message_input.value = '';
    }
  };

  const handleShowPicker = () => {
    var rect = document.getElementById('emoji-picker-button').getBoundingClientRect();

    setEmojiPickerStyle({
      position: 'fixed',
      top: (rect.top + rect.height/2) + 'px',
      left: (rect.left + rect.height) + 'px',
      transform: 'translate(-100%, -110%)'
    });

    console.log(rect);
    setShowPicker(true);
  };

  useEffect(() => {
    message_end_reference.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className='chat-typing-area'>
      <img src={ profile_img_url } alt='' className='chat-row-img' />
      <div className='message-input-container'>
        <textarea name='message' id='message-input' className='message-input' 
        placeholder='Type a message' 
        rows='1' 
        onKeyDown={ handleKeyDown } />
        <div className='file-emoji-input-contaier'>
          <AiOutlinePaperClip />
          <HiOutlineEmojiHappy 
            id='emoji-picker-button'
            onClick={ () => {
                if (!show_picker) {
                  handleShowPicker();
                } else {
                  setShowPicker(false);
                }
              } } />
          { show_picker && 
            (
              <div style={ {position: 'absolute'} } onKeyDown={ e => { if (e.code === 'Escape') setShowPicker(false) } }>
                <Picker 
                  onEmojiClick={ onEmojiClick }
                  pickerStyle={ emoji_picker_style }
                  native='true' />
              </div>
            ) }
        </div>
      </div>
      <button 
        className='send-message-button main-button'
        onClick={ handleClick }>
        <RiSendPlaneFill />
        <span>Send</span>
      </button>
    </div>
  );
}

export default TypingArea;
