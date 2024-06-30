import Login from "./component/account/Login";
import Home from "./component/Home/Home"
import Navbar from "./component/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useState } from "react";
import DataProvider from "./component/Config/DataProvider";
import CreatePost from "./component/create/CreatePost";
import PostDetail from "./component/postdetail/PostDetail";
import UpdatePost from "./component/postdetail/UpdatePost";
import ContactForm from "./component/contact/Contact";
import AboutUsPage from "./component/about/About";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('access_token');
  return isAuthenticated && token ?
  <>
      <Navbar />
      <Outlet {...props} />
    </> : <Navigate replace to='/login' />
};


export default function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false)
  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{  marginTop: 67 }}>
          <Routes>

            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/createpost' element={<CreatePost/>}  />
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<PostDetail/>}  />
            </Route>
            
            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<UpdatePost/>}  />
            </Route>
            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<ContactForm/>}  />
            </Route>
            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<AboutUsPage/>}  />
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
  // console.log(isAuthenticated)
}
