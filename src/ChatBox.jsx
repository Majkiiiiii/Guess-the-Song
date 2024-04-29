import React, { useRef, useState, useEffect } from "react";
import VolumeBar from "./VolumeBar";
import AddToChat from "./AddToChat";
import './Chat.css';
import './App.css';

function ChatBox({ messages, guess, handleChange, handleKeyDown, handleGuess, song, onIsPlayingChange, onSongEnd }) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5); // Volume state is between 0 and 1
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    console.log('Audio started playing!');
    setIsPlaying(true);
    if (onIsPlayingChange) {
      onIsPlayingChange(true);
    }
  };

  const handleButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (!userInteracted) {
        setUserInteracted(true);
      }
  
      // Toggle the play/pause state based on the current state.
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      // Toggle the isPlaying state to reflect the change.
      setIsPlaying(!isPlaying);
    }
  };
  

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
  
      let timeout;
      if (userInteracted && isPlaying) {
        timeout = setTimeout(() => {
          audioRef.current.pause();
          setIsPlaying(false);
          if (onIsPlayingChange) {
            onIsPlayingChange(false);
          }
          if (onSongEnd) {
            onSongEnd();
          }
        }, 30000);
      }
  
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [volume, userInteracted, isPlaying, onSongEnd, onIsPlayingChange]);

  const handleSongEnd = () => {
    console.log('Song ended!');
    setIsPlaying(false);
    if (onIsPlayingChange) {
      onIsPlayingChange(false);
    }
    if (onSongEnd) {
      onSongEnd();
    }
  };

  return (
    <div className="ChatBox">
        <h2>Zgadnij Piosenkę</h2>
        <div className="ChatMessages">
            {messages.map((message, index) => (
                <AddToChat key={index} playerName="boban" guess={message} />
            ))}
        </div>
        <div className="InputContainer">
            <input
                type="text"
                value={guess}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Wpisz nazwę piosenki"
            />
        </div>


        <div className="playMusic">
          <button onClick={handleButtonClick}>{isPlaying ? 'Pause' : 'Play'}</button>
          {/* Render VolumeBar here */}
          <VolumeBar volume={volume * 100} setVolume={(val) => setVolume(val / 100)} /> 
          <audio 
            ref={audioRef} 
            src={song?.hub?.actions[1]?.uri} 
            type="audio/mpeg"         
            onPlay={handlePlay}
            onEnded={handleSongEnd} 
          />
        </div>
    </div>
  );
}

export default ChatBox;