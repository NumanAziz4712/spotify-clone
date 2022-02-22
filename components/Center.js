import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';

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

  // useeffec
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);
  return (
    <div className='flex-grow relative'>
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
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-72`}
      ></section>
    </div>
  );
};

export default Center;
