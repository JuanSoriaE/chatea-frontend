import './ChatRow.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function ChatRow({ chat, user, public_id }) {

  let resolved = useResolvedPath(`/chat/${public_id}`);
  let match = useMatch({path: resolved.pathname, end: true});
  
  const getNameToDisplay = () => {
    if (chat.is_group) return chat.group_name;

    if (chat.members[0] === user) return chat.members[1];

    return chat.members[0];
  };
  
  return (
    <Link to={ `/chat/${public_id}` } className='link-to-chat chat-row' style={ {
      backgroundColor: match && '#3f3f5d'
    } }>
      <img className='chat-row-img' src={ chat.is_group ? '' : '' }></img>
      <div className='chat-row-info-container'>
        <span className={ 'chat-row-info' + (false ? ' new-message' : '' ) }>{ getNameToDisplay() }</span>
      </div>
    </Link>
  );
}

export default ChatRow;
