import React from 'react';
import useSpotify from '../hooks/useSpotify';
import millisToMinutesAndSeconds from '../lib/time';
const Song = ({ index, track }) => {
  const spotifyApi = useSpotify();
  console.log(track);
  return (
    <div className='grid grid-cols-2 text-gray-500'>
      <div className='flex items-center space-x-4'>
        <p>{index + 1}</p>
        <img className='h-10 w-10 ' src={track.album.images?.[0].url} alt='' />
        <div>
          <p className='w-36 lg:w-64 text-white truncate'>{track.name}</p>
          <p>{track.artists[0].name}</p>
        </div>
      </div>
      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='hidden md:inline-flex'>{track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
