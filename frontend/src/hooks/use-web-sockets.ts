import { useEffect, useState } from 'react';
import { io, Socket, ManagerOptions, SocketOptions } from 'socket.io-client';

const { REACT_APP_SOCKET_URL = 'ws://localhost:8000' } = process.env;
const SOCKET_OPTIONS: Partial<ManagerOptions & SocketOptions> = {
  port: 8000,
  transports: ['websocket', 'polling'],
};

export enum DefaultSocketEvents {
  CONNECTION_ERROR = 'connect_error',
  DISCONNECT = 'DISCONNECT',
  LOG = 'LOG',
  ERROR = 'ERROR',
}

export enum CustomSocketEvents {
  CUSTOM_EVENT = 'CUSTOM_EVENT',
}

export type SocketEvents = DefaultSocketEvents | CustomSocketEvents;

export interface IWebSocketEvent {
  event: SocketEvents;
  callback: (data: any) => void;
}

const DEFAULT_EVENTS: IWebSocketEvent[] = [
  { event: DefaultSocketEvents.DISCONNECT, callback: (socket) => socket.disconnect() },
  { event: DefaultSocketEvents.LOG, callback: (args) => console.log('Socket Logger: ', args) },
  {
    event: DefaultSocketEvents.CONNECTION_ERROR,
    callback: (error) => console.log('Web Socket connection error', error),
  },
  { event: DefaultSocketEvents.ERROR, callback: (error) => console.log('Web Socket error', error) },
];

export interface IUseWebSocketParams {
  events?: IWebSocketEvent[];
  query?: { [keyof: string]: string };
}

export interface IUseWebSocketResponse {
  init: () => void;
  bindEvent: ({ event, callback }: IWebSocketEvent) => void;
  events?: IWebSocketEvent[];
  socketConnection?: Socket;
}

export const useWebSockets = ({ events, query }: IUseWebSocketParams): IUseWebSocketResponse => {
  const [socketConnection, setSocketConnection] = useState<Socket>();
  const [socketEvents, setSocketEvents] = useState<IWebSocketEvent[]>(events || []);

  useEffect(() => {
    if (!socketConnection) {
      return () => {};
    }

    return () => socketConnection.disconnect();
  }, [socketConnection]);

  const init = () => {
    if (socketConnection) {
      socketConnection.disconnect();
    }

    const socketConnectionTrigger = io(REACT_APP_SOCKET_URL, {
      ...SOCKET_OPTIONS,
      query,
    });

    socketConnectionTrigger.on('connection', () => {
      const eventsToBind = [...DEFAULT_EVENTS, ...(events || [])];

      for (const { event: socketEvent, callback } of eventsToBind) {
        socketConnectionTrigger.on(socketEvent, callback);
      }

      setSocketConnection(socketConnectionTrigger);
    });
  };

  const bindEvent = ({ event, callback }: IWebSocketEvent) => {
    socketConnection?.on(event, callback);
    setSocketEvents([...(events || []), { event, callback }]);
  };

  return {
    init,
    bindEvent,
    events: socketEvents,
    socketConnection,
  };
};
