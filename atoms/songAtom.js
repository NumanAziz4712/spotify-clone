import { atom } from 'recoil';

// the current track. tells us which tracj id we have selected
export const currentTrackIdState = atom({
  key: 'currentTrackIdState',
  default: null,
});

// boolean value, playing or not.
export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
