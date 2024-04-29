import React, { useRef, useState, useEffect } from 'react';
import VolumeBar from './VolumeBar';
import './App.css';

const SimpleMusicPlayer = ({ song, onIsPlayingChange, onSongEnd}) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    console.log('Audio started playing!');
  };

  const handleButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume;

      if (!userInteracted) {
        setUserInteracted(true);
      }
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
  
      let timeout;
      if (userInteracted) {
        timeout = setTimeout(() => {
          audioRef.current.pause();
          setIsPlaying(false);
          onIsPlayingChange(false);
          if (onSongEnd) {
            onSongEnd();
          }
        }, 30000);
      }
  
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [volume, userInteracted, onSongEnd]);

  const handleSongEnd = () => {
    console.log('Song ended!');
    setIsPlaying(false);
    onIsPlayingChange(false);
    if (onSongEnd) {
      onSongEnd();
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Play</button>
      <VolumeBar volume={volume} setVolume={setVolume} />
      <audio 
      ref={audioRef} 
      src={song.hub?.actions[1]?.uri} 
      type="audio/mpeg"         
      onPlay={handlePlay}
      onEnded={handleSongEnd} 
      />
    </div>
  );
};

export default SimpleMusicPlayer;