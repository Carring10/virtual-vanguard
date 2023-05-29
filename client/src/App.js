import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Bookmark } from './pages/Bookmark';
import { Feed } from './pages/Feed';
import { Article } from './pages/Article';
import { Register } from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/bookmark' element={<Bookmark />} />
          <Route path='/article' Component={Article} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
