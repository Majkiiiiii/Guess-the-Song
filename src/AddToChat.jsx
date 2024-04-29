import React from "react";
import './Chat.css';

function AddToChat({ playerName, guess }) {
  return (
    <div className="message">
      <span>{playerName}: {guess}</span>
    </div>
  );
}

export default AddToChat;