import { atom } from 'recoil';
// atom is kind of slice of the global state
// it is specefic to a certain thing
// the key for each atom is unique
export const playlistIdState = atom({
  key: 'playlistIdState',
  //   just like the default state. thats the playlist id
  default: '3w8xbKdt5EAuaNeH49jqWL',
});

export const playListState = atom({
  key: 'playListState',
  default: null,
});
