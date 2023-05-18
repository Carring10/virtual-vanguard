import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Bookmark } from './pages/Bookmark';
import { Articles } from './pages/Articles';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Articles />} />
          <Route path='/bookmark' element={<Bookmark />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
