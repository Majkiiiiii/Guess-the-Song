import React from 'react';

const VolumeBar = ({ volume, setVolume }) => {
  const handleChange = (e) => {
    const volumeValue = e.target.value / 100; // Convert from 1-100 to 0-1
    setVolume(volumeValue);
  };

  return (
    <input
      type="range"
      step="1" // Step is 1, as volume is scaled from 1-100
      value={volume * 100} // Convert from 0-1 to 1-100 for the slider
      min="0" // Minimum is 0
      max="100" // Maximum is 100
      onChange={handleChange}
      className="volume-bar"
    />
  );
};

export default VolumeBar;
