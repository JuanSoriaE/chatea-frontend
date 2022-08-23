export default {
  chats: [
    {
      public_id: 'chat1',
      members: [{
        username: 'Usuario1',
        img_url: 'https://i.picsum.photos/id/382/200/200.jpg?hmac=1RBvTrTJY2s3gldIAai5u3hsPDx6IEzsQg9uUC-MARo'
      }, {
        username: 'Usuario2',
        img_url: 'https://i.picsum.photos/id/500/200/200.jpg?hmac=YM_kCxc6fpX7ohYhMuMZ-oh5KlS16ixgqqD8kfLS7-g'
      }],
      is_group: false,
      group_name: '',
      chat_history: [],
      new_message: true
    },
    {
      public_id: 'chat2',
      members: [{
        username: 'Usuario1',
        img_url: 'https://i.picsum.photos/id/382/200/200.jpg?hmac=1RBvTrTJY2s3gldIAai5u3hsPDx6IEzsQg9uUC-MARo'
      }, {
        username: 'Usuario2',
        img_url: 'https://i.picsum.photos/id/500/200/200.jpg?hmac=YM_kCxc6fpX7ohYhMuMZ-oh5KlS16ixgqqD8kfLS7-g'
      }, {
        username: 'Usuario3',
        img_url: 'https://i.picsum.photos/id/817/200/200.jpg?hmac=c7RMfV0IboK5oZwkIxQ9Ofx8Bml5x-j42i9DKdKrTwo'
      }],
      is_group: true,
      group_name: 'Chat group test',
      chat_history: [{
        message: 'Message from Usuario1',
        from: 'Usuario1'
      }, {
        message: 'Message from Usuario2',
        from: 'Usuario2'
      }, {
        message: 'Message from Usuario3',
        from: 'Usuario3'
      }],
      new_message: false,
      img_url: 'https://i.picsum.photos/id/670/200/200.jpg?hmac=r8TCUI8W_ykYaZnXA3SXAoh2eXVWEefFjjZ2VsLJBXg'
    },
    {
      public_id: 'chat3',
      members: [{
        username: 'Usuario1',
        img_url: 'https://i.picsum.photos/id/382/200/200.jpg?hmac=1RBvTrTJY2s3gldIAai5u3hsPDx6IEzsQg9uUC-MARo'
      }, {
        username: 'Usuario3',
        img_url: 'https://i.picsum.photos/id/817/200/200.jpg?hmac=c7RMfV0IboK5oZwkIxQ9Ofx8Bml5x-j42i9DKdKrTwo'
      }],
      is_group: false,
      group_name: '',
      chat_history: [],
      new_message: true
    },
    {
      public_id: 'chat4',
      members: [{
        username: 'Usuario1',
        img_url: 'https://i.picsum.photos/id/382/200/200.jpg?hmac=1RBvTrTJY2s3gldIAai5u3hsPDx6IEzsQg9uUC-MARo'
      }, {
        username: 'Usuario4',
        img_url: 'https://i.picsum.photos/id/217/200/200.jpg?hmac=LoNAUhfCfURrqYjw6WECEWybn4B8y37k5G2odewlZ_Y'
      }],
      is_group: false,
      group_name: '',
      chat_history: [],
      new_message: false
    }
  ]
};