import { useEffect, useState } from 'react';
import { io, Socket, ManagerOptions, SocketOptions } from 'socket.io-client';

const { REACT_APP_SOCKET_URL = 'ws://localhost:8000' } = process.env;
const SOCKET_OPTIONS: Partial<ManagerOptions & SocketOptions> = {
  port: 8000,
  transports: ['websocket', 'polling'],
};

export enum SocketEvents {
  CONNECTION_ERROR = 'connect_error',
  DISCONNECT = 'DISCONNECT',
  LOG = 'LOG',
  ERROR = 'ERROR',
}

export interface IWebSocketEvent {
  event: SocketEvents;
  callback: (data: any) => void;
}

const DEFAULT_EVENTS: IWebSocketEvent[] = [
  { event: SocketEvents.DISCONNECT, callback: (socket) => socket.disconnect() },
  { event: SocketEvents.LOG, callback: (args) => console.log('Socket Logger: ', args) },
  { event: SocketEvents.CONNECTION_ERROR, callback: (error) => console.log('Web Socket connection error', error) },
  { event: SocketEvents.ERROR, callback: (error) => console.log('Web Socket error', error) },
];

export interface IUseWebSocketParams {
  events?: IWebSocketEvent[];
  query?: { [keyof: string]: string };
}

export const useWebSockets = ({ events, query }: IUseWebSocketParams) => {
  const [socketConnection, setSocketConnection] = useState<Socket>();

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

  return {
    init,
    events,
    socketConnection,
  };
};
