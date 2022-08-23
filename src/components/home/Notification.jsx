import './Notification.css';
import { Link } from 'react-router-dom';
import { IoMdClose, IoMdNotifications } from 'react-icons/io';

function Notification({ data, setShowNoti }) {
  return (
    <div className='noti-main-container link-to-chat'>
      <Link to={ `/chat/${data.public_id}` } className='link-to-chat noti-info-main-container'>
        <div className='noti-img-container'>
          <IoMdNotifications />
        </div>
        <div className='noti-info-container'>
          <div className='noti-info-title'>
            <h5 className='noti-title'>New Message</h5>
          </div>
          <p className='noti-text'><span className='noti-text-sender'>{ data.message_data.from }: </span>{ data.message_data.message }</p>
        </div>
      </Link>
      <IoMdClose className='close-noti-icon' onClick={ () => setShowNoti(false) } />
    </div>
  );
}

export default Notification;
