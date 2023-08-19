import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Error404 from "../Error404/Error404";


function App() {
  return (
      <div className='root'>
        <div className='page'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/profile' element={<Profile name="Вика" email="vii@123.com" />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
