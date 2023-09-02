import "./pages/Feed/feed.css";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Discover } from './pages/Discover';
import { Feed } from './pages/Feed/Feed';
import { Article } from './pages/Article/Article';
import { Register } from './pages/Register/Register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/discover' element={<Discover />} />
          <Route path='/article' Component={Article} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/login' element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
