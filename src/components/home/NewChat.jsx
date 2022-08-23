import './NewChat.css';
import { MdGroups } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewChat() {

  const url = 'http://localhost:5000/';

  const friends = JSON.parse(localStorage.getItem('friends'));

  let navigate = useNavigate();

  const [create_group, setCreateGroup] = useState(false);

  const friendRow = (friend, id) => {
    return (
      <button key={ id } className='friend-row' onClick={ () => {
        if (!create_group) handleCreateChat(friend)
      } }>
        <label htmlFor={ friend + '-checkbox' }>
          { friend }
        </label>
        {
          create_group && <input type='checkbox' className='friend-checkbox' id={ friend + '-checkbox' } />
        }
      </button>
    );
  };

  const createChat = (choosen_friends) => {
    const token = localStorage.getItem('access-token');

    axios({
      method: 'post',
      url: url + 'chat',
      headers: {
        'access-token': token
      },
      data: {
        members: choosen_friends,
        is_group: false
      }
    }).then(res => {
      navigate(`/chat/${res.data.public_id}`);
    }).catch(err => {
      console.log(err);
    });
  };

  const handleCreateChat = friend => {
    let choosen_friends = [localStorage.getItem('username'), friend];

    createChat(choosen_friends);
  };

  const createGroup = (choosen_friends, group_name) => {
    const token = localStorage.getItem('access-token');

    axios({
      method: 'post',
      url: url + 'chat',
      headers: {
        'access-token': token
      },
      data: {
        members: choosen_friends,
        is_group: true,
        group_name
      }
    }).then(res => {
      navigate(`/chat/${res.data.public_id}`);
    }).catch(err => {
      console.log(err);
    });
  };

  const handleCreateGroup = () => {
    // Get choosen friends
    const friends_rows = document.getElementsByClassName('friend-row');
    const group_name_input = document.getElementById('group-name-input');

    let choosen_friends = [localStorage.getItem('username')];

    for (let friend_row of friends_rows) {
      if (friend_row.children[1].checked) {
        choosen_friends.push(friend_row.children[0].textContent);
      }
    }

    if (choosen_friends.length < 3) {
      alert('You have to choose at least one friend');
      return friends_rows[0].focus();
    }

    // Get group name
    const group_name = group_name_input.value;
    
    if (!group_name) {
      alert('You have to set a group name.');
      return group_name_input.focus();
    }

    // Create group request
    createGroup(choosen_friends, group_name);
  };

  return (
    <div className='main-new-chat'>
      <div className='new-chat-title-container'>
        <h3 className='new-chat-title'>New Chat</h3>
      </div>
      <div className='new-chat-main-content'>
        <button className='new-chat-new-group-button' onClick={ () => {setCreateGroup(!create_group)} }>
          <MdGroups className='new-group-icon' />
          <span>Create New Group</span>
          {
            create_group && <AiFillCheckCircle className='group-selected-icon' />
          }
        </button>
        <span className='chats-list-section-header'>DIRECT MESSAGE</span>
        <div className='friends-rows-container'>
          {
            friends.map((friend, id) => friendRow(friend, id))
          }
        </div>
        {
          create_group && 
          <div className='create-group-button-container'>
            <input type='text' id='group-name-input' placeholder='Group Name' className='group-name-input' />
            <button className='main-button create-group-button' onClick={ () => handleCreateGroup() }>Create Group</button>
          </div>
        }
      </div>
    </div>
  );
}

export default NewChat;
