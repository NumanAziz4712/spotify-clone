import React from 'react';
import { useRecoilValue } from 'recoil';
import { playListState } from '../atoms/playlistAtom';
import Song from './Song';

const Songs = () => {
  const playlist = useRecoilValue(playListState);
  //   console.log(playlist);
  return (
    <div className='text-white px-8 flex flex-col space-y-1'>
      {playlist?.tracks.items.map((track, index) => (
        <Song key={track.track.id} {...track} index={index} />
      ))}
    </div>
  );
};

export default Songs;
