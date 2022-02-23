import React, { useEffect } from 'react';
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';
const Sidebar = () => {
  const spotifyApi = useSpotify();
  // a helper method to know if we are loggedin or out
  // gives acces to logged in state
  // we need to persist the state when login and out
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylisId] = useRecoilState(playlistIdState);
  console.log(`you picked playlist >>> ${playlistId}`);

  useEffect(() => {
    // if the user has the access token
    // fetch the playlis
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  // console.log(session);
  return (
    // the scroll wouldnt work without the h-screen
    <div className='text-gray-500 p-5 scrollbar-hide overflow-y-scroll border-r  h-screen border-gray-900 lg:text-sm text-xs hidden md:inline-flex sm:max-w-[12rem] lg:max-w-[15rem]'>
      <div className='space-y-3'>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LibraryIcon className='h-5 w-5' />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[2px] border-gray-900' />
        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='h-5 w-5' />
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5' />
          <p>Your episodes</p>
        </button>
        <hr className='border-t-[2px] border-gray-900' />
        {/* playlist */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylisId(playlist.id)}
            className='cursor-pointer hover:text-white'
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
