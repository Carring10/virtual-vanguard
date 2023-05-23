import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Bookmark } from './pages/Bookmark';
import { Feed } from './pages/Feed';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/bookmark' element={<Bookmark />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
