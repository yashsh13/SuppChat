import { atom } from "jotai";

export const createRoomAtom = atom(false);

export const joinRoomAtom = atom(false);

export const errorDisplayAtom = atom('');

export const userGlobalStateAtom = atom({
    username:'',
    roomid:'',
    ws: new WebSocket('ws://localhost:8080')
});

export const peopleInRoomAtom = atom<any[]>([]);

export const chatHistoryAtom = atom<any[]>([]);