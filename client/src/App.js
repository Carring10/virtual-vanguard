import "./pages/Feed/feed.css";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Bookmark } from './pages/Bookmark';
import { Feed } from './pages/Feed/Feed';
import { Article } from './pages/Article/Article';
import { Register } from './pages/Register';
import { Login } from './pages/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/bookmark' element={<Bookmark />} />
          <Route path='/article' Component={Article} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
