import { useContext } from 'react';
import { useEffect } from 'react';
import { WebSocketsContext } from './contexts/web-sockets';

const App = () => {
  const { init, socketConnection } = useContext(WebSocketsContext);

  useEffect(() => {
    init();
  }, []);

  return (
    <main>
      <h1>React Node - Real-time app starter</h1>
      <p>{socketConnection?.connected ? 'Socket connected' : 'Connecting...'}</p>
    </main>
  );
};

export default App;
