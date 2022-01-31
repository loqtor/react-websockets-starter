import { IUseWebSocketParams, IUseWebSocketResponse, IWebSocketEvent, useWebSockets } from '../hooks/use-web-sockets';
import { createContext } from 'react';

export const WebSocketsContext = createContext<IUseWebSocketResponse>({
  init: () => {},
  bindEvent: ({ event, callback }: IWebSocketEvent) => {
    console.log('This is the default implementation to initialise things happily.');
  },
});

export type WebSocketsProviderProps = IUseWebSocketParams & {
  children: React.ReactNode;
};

export const WebSocketsProvider = ({ events, query, children }: WebSocketsProviderProps) => {
  const { init, socketConnection, bindEvent } = useWebSockets({ events, query });

  return (
    <WebSocketsContext.Provider value={{ init, bindEvent, socketConnection, events }}>
      {children}
    </WebSocketsContext.Provider>
  );
};
