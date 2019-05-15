import React from 'react';

const ChatsList: React.FC = () => (
  <div>
    <ul>
      <li>
        <img
          src="https://randomuser.me/api/portraits/thumb/men/1.jpg"
          alt="Profile"
        />
        <div>Ethan Gonzalez</div>
        <div>You on your way?</div>
        <div>10:25</div>
      </li>
      <li>
        <img
          src="https://randomuser.me/api/portraits/thumb/men/2.jpg"
          alt="Profile"
        />
        <div>Bryan Wallace</div>
        <div>Hey, it's me</div>
        <div>13:27</div>
      </li>
    </ul>
  </div>
);

export default ChatsList;
