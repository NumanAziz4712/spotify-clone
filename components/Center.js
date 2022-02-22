import { useSession } from 'next-auth/react';
import React from 'react';
const Center = () => {
  const { data: session } = useSession();
  return (
    <div className='flex flex-grow text-white'>
      <header>
        <div>
          <img
            src={session?.user?.image}
            alt=''
            className='w-10 h-10 rounded-full bg-gray-50'
          />
        </div>
      </header>
    </div>
  );
};

export default Center;
