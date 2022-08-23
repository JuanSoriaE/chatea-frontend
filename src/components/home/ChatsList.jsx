import './ChatsList.css';
import ChatsListSection from './chats_list/ChatsListSection';

function ChatsList({ chats, socket }) {

  const emitJoinReq = () => {
    var public_ids = [];
    
    chats.forEach(chat => {
      public_ids.push(chat.public_id);
    });

    socket.emit('join req', public_ids);
  };

  emitJoinReq();

  const getDirectMessages = () => {
    return chats.filter(chat => chat.is_group === false);
  };
  const getGroups = () => {
    return chats.filter(chat => chat.is_group === true);
  };

  return (
    <div className='main-chats-list'>
      <div className='chats-list-header'>
        <h3 className='chats-list-header-text'>Chat Room</h3>
      </div>
      <div className='chats-sections-container'>
        <ChatsListSection 
          section_name='ALL CHATS'
          chats={ chats } />
        <ChatsListSection 
          section_name='DIRECT MESSAGES'
          chats={ getDirectMessages() } />
        <ChatsListSection 
          section_name='GROUPS'
          chats={ getGroups() } />
      </div>
    </div>
  );
}

export default ChatsList;
