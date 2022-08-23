import './Modal.css';
import { IoMdClose } from 'react-icons/io';

function Modal({ title, message, friends, action, setModal }) {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <IoMdClose className='close-modal-icon' onClick={ () => setModal(false) } />
        <h4>{ title }</h4>
        <span>{ message }</span>
        <select className='modal-select' id='modal-select'>
          {
            friends.map((friend, i) => <option key={ i }>{ friend }</option>)
          }
        </select>
        <input type='button' value={ title } className='main-button' onClick={ action } />
      </div>
    </div>
  );
}

export default Modal;
