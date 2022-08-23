import './ConfirmAlert.css';
import { IoMdClose } from 'react-icons/io';

function ConfirmAlert({ title, message, action, setModal }) {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <IoMdClose className='close-modal-icon' onClick={ () => setModal(false) } />
        <h4>{ title }</h4>
        <span>{ message }</span>
        <div className='confirm-buttons-container'>
          <input type='button' value='Cancel' className='cancel-button' onClick={ () => setModal(false) } />
          <input type='button' value='Accept' className='main-button' onClick={ action } />
        </div>
      </div>
    </div>
  );
}

export default ConfirmAlert;
