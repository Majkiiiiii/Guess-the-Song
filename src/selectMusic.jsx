import React, { useState } from 'react';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSong } from '../redux/features/playerSlice';
import SimpleMusicPlayer from './playMusic';

const SelectMusic = ({ handleSelectSong , onIsPlayingChange, onSongEnd}) => {
  const [guess, setGuess] = useState('');
  const { data, isFetching, error } = useGetSongsBySearchQuery(guess);
  const dispatch = useDispatch();
  const activeSong = useSelector((state) => state.player.activeSong);
  const [audio, setAudio] = useState(new Audio());

  const handleSelectSongInternal = (selectedSong) => {
    dispatch(setActiveSong({ song: selectedSong }));
    setAudio(new Audio(selectedSong.preview));
    setAudio(new Audio(selectedSong.preview));
    audio.play();

    handleSelectSong(selectedSong);
  };

  return (
    <div id="huj-ci-do-tego">
      <input onChange={(e) => setGuess(e.target.value)} value={guess} placeholder="Search for songs" />

      {isFetching && <p>Loading songs...</p>}

      {data && Array.isArray(data.tracks.hits) && (
        <ul>
          {data.tracks.hits.slice(0, 4).map((song) => (
            <li key={song.track.key} onClick={() => handleSelectSongInternal(song.track)}>
              {song.track.title} - {song.track.subtitle}
            </li>
          ))}
        </ul>
      )}

      {activeSong && (
        <div>
          <h3>Active Song:</h3>
          <p>{activeSong.title} - {activeSong.subtitle}</p>
        </div>
      )}
    </div>
  );
};

export default SelectMusic;