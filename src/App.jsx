
import { Routing } from './routes/Routing'
import FavoritesProvider from './context/FavoritesProvider';
import SessionProvider from './context/SessionProvider';


function App() {
  return (
    <SessionProvider>
      <FavoritesProvider>
        <Routing />
      </FavoritesProvider>
    </SessionProvider>
  );
}

export default App


