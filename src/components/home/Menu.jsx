import './Menu.css';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoIosLogOut } from 'react-icons/io';
import { IoSettingsOutline, IoClose } from 'react-icons/io5';
import { BsChatSquareText } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Menu({ setAuth }) {

  const logOut = () => {
    localStorage.clear();
    window.location = '/';
    setAuth(false);
  };

  const [show_menu, setShowMenu] = useState(false);

  return (
    <div className='menu-main'>
      { show_menu && 
      <div className='menu' onClick={ () => setShowMenu(false) }>
        <Link to='/new'>
          <BsChatSquareText className='menu-button-icon' />
          <span>New Chat</span>
        </Link>
        <button>
          <IoSettingsOutline className='menu-button-icon' />
          <span>Settings</span>
        </button>
        <button onClick={ logOut }>
          <IoIosLogOut className='menu-button-icon' />
          <span>Log out</span>
        </button>
      </div> }
      <div className='menu-button' onClick={ () => setShowMenu(!show_menu) }>
        {
          show_menu ? <IoClose className='menu-icon' /> : <FiMenu className='menu-icon' />
        }
      </div>
    </div>
  );
}

export default Menu;
