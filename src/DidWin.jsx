import React from 'react';

const DidWin = ({ isWinner }) => {

  return (
    <div className="did-win-container">
      {isWinner ? (
        <p className="win-message">Wygrałeś! {console.log("Wygrałeś!")}</p>
      ) : (
        <p className="lose-message">Przegrałeś! {console.log("Przegrałeś!")}</p>
      )}
    </div>
  );
};

export default DidWin;