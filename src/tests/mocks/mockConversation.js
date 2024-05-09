const mockConversation = {
  _id: '62225efef4761e8926d632b1', // MongoDB-style ObjectId
  lastMessage: '62225f10f4761e8926d632b2', // MongoDB-style ObjectId for the last message
  participants: [
    {
      _id: '62225e00f4761e8926d632a0',
      username: 'johndoe', // Example participant's username
      avatarUrl: 'http://example.com/path/to/avatar.jpg', // URL to the avatar image
    },
    {
      _id: '62225e10f4761e8926d632a1',
      username: 'janedoe',
      avatarUrl: 'http://example.com/path/to/another-avatar.jpg',
    },
  ],
  messages: [
    '62225f10f4761e8926d632b2', // List of message ObjectIds
    '62225f11f4761e8926d632b3',
  ],
  createdAt: new Date('2021-03-05T14:48:00.000Z'),
  updatedAt: new Date('2021-03-05T14:50:00.000Z'),
};

export { mockConversation };