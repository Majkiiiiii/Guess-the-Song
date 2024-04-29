import React, { useState, useEffect } from 'react';
import ChatBox from './ChatBox';
import GuessBox from './GuessBox';
import SelectMusic from './selectMusic';
import VolumeBar from './VolumeBar';
import './App.css';

function Game() {
  const [guess, setGuess] = useState('');
  const [messages, setMessages] = useState([]);
  const [songToGuess, setSongToGuess] = useState('');
  const [guessedLetters, setGuessedLetters] = useState(['']);
  const [didWin, setDidWin] = useState('');
  const [isPlaying, setIsPlaying] = useState(null);
  const [buttonGuess,setButtonGuess] = useState('');
  const [songEnded, setSongEnded] = useState(false);
  const [gameStatus, setGameStatus] = useState('');
  const [volume, setVolume] = useState(0.5);
  const [currentSong, setCurrentSong] = useState(null); // Added this state to track the current song

  const GAME_STAGE = {
    PICK_SONG: 'PICK_SONG',
    PLAYING: 'PLAYING',
    GAME_OVER: 'GAME_OVER',
  };
  
  const [gameStage, setGameStage] = useState(GAME_STAGE.PICK_SONG);

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  useEffect(() => {
    if (songEnded && gameStatus !== 'You Won!') {
      setGameStatus('You Lose!');
      setGameStage(GAME_STAGE.GAME_OVER);
    }
  }, [songEnded, gameStatus]);

  const handleSelectSong = (selectedSong) => {
    setCurrentSong(selectedSong); // Set the current song
    setSongToGuess(selectedSong.title);
    setGuessedLetters([]);
    setDidWin('');
    setIsPlaying(false);
    setSongEnded(false);
    setGameStatus('');
    setGameStage(GAME_STAGE.PLAYING);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
      setButtonGuess(guess);
    }
  };

  const handleSubmit = () => {
    setMessages([...messages, guess]);
    handleGuess(guess);
    setGuess('');
  };

  const handleGuess = (guess) => {
    setMessages([...messages, guess]);
    const lowerCaseGuess = guess.toLowerCase();
    if (lowerCaseGuess === songToGuess.toLowerCase()) {
      setGuessedLetters([...songToGuess.toLowerCase()]);
      setGameStatus('You Won!');
      setGameStage(GAME_STAGE.GAME_OVER);
    } else {
      setGuessedLetters((prevGuesses) => {
        const updatedGuesses = new Set([...prevGuesses, ...lowerCaseGuess.split('')]);
        return Array.from(updatedGuesses);
      });
    }
  };

  const resetGame = () => {
    setGuess('');
    setMessages([]);
    setSongToGuess('');
    setGuessedLetters(['']);
    setDidWin('');
    setIsPlaying(null);
    setButtonGuess('');
    setSongEnded(false);
    setGameStatus('');
    setGameStage(GAME_STAGE.PICK_SONG);
  };

  const onSongEnd = () => {
    setSongEnded(true);
  };

  return (
    <div>
      {gameStage === GAME_STAGE.PICK_SONG && (
        <div>
          <h2>Pick a Song!</h2>
          <SelectMusic
            handleSelectSong={(selectedSong) => {
              handleSelectSong(selectedSong);
              setGameStage(GAME_STAGE.PLAYING);
            }}
            onIsPlayingChange={(value) => setIsPlaying(value)}
          />
        </div>
      )}

      {gameStage === GAME_STAGE.PLAYING && (
        <div>
          <ChatBox
            messages={messages}
            guess={guess}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            handleGuess={handleGuess}
            song={currentSong} // Pass the current song to ChatBox
            onIsPlayingChange={setIsPlaying}
            onSongEnd={onSongEnd}
          />
          <GuessBox id="guess-box" songToGuess={songToGuess} guessedLetters={guessedLetters} />
       
        </div>
      )}

      {gameStage === GAME_STAGE.GAME_OVER && (
        <div>
          <div>{gameStatus}</div>
          <button onClick={resetGame}>Again!</button>
        </div>
      )}
    </div>
  );
}

export default Game;
