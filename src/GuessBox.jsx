import React from 'react';

const wordStyle = {
  marginRight: '1em',
};

export default function GuessBox({ songToGuess, guessedLetters }) {
  const wordsToGuessArr = songToGuess.split(/\s+/);

  const writeUnderlines = () => {
    return wordsToGuessArr.map((word, wordIndex) => (
      
      <span key={wordIndex} style={wordStyle} >
        {word.split('').map((letter, index) => (
          <span key={index}>{guessedLetters.map(l => l.toLowerCase()).includes(letter.toLowerCase()) ? letter : '_ '} </span>
        ))}
      </span>
    ));
  };

  return (
    <div className='guess-box'>
      {writeUnderlines()}
    </div>
  );
}
