import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playListState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

// colors
const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  // we can get the read only value from the recoil
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playListState);
  const spotifyApi = useSpotify();
  // useeffec
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  // set the play list
  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log('something went wrong', err));
  }, [spotifyApi, playlistId]);
  console.log(playlist);
  return (
    <div className='flex-grow relative overflow-y-scroll h-screen scrollbar-hide'>
      <header>
        <div className='flex absolute right-8 top-5 items-center bg-black p-1 pr-2 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full text-white'>
          <img
            src={session?.user?.image}
            alt=''
            className='w-10 h-10 rounded-full bg-gray-50'
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b p-8 to-black ${color} h-80`}
      >
        <img
          className='h-44 w-44 shadow-2xl'
          src={playlist?.images?.[0]?.url}
          alt=''
        />
        <div className='text-white'>
          <p>PLAYLIST</p>
          <h1 className='text-2xl md:text-3xl xl:text-5xl'>{playlist?.name}</h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
