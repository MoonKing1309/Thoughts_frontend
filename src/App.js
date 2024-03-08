import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {useEffect, useState} from 'react'

import Navbar from './components/navbar.js';
import Home from './components/home.js';
import HistoryYear from './components/historyyear.js';
import HistoryMonth from './components/historymonth.js';
import HistoryPosts from './components/historyposts.js';
import Signup from './components/signup.js';
import Login from './components/login.js';
import CreateAndEdit from './components/createandedit.js';
import Write from './components/write.js';
import ViewPost from './components/viewpost.js';

function App() {

  var templ,tempd;

  const [dateCreated,setDateCreated] = useState(null)
  const [loginVal,setLoginVal] = useState(null)

  useEffect(() => {
    const loginval = JSON.parse(localStorage.getItem('loginVal'));
    if (loginval) {
     setLoginVal(loginval);
    }
    else{

    }
    const items = JSON.parse(localStorage.getItem('dateCreated'));
    if (items) {
     setDateCreated(items);
    }
  },[]);

  return (
    <div className="App">
         <Router>
        <Navbar loginState={[loginVal,setLoginVal]} dateCreated={[dateCreated,setDateCreated]}/>
        <Routes>
          <Route path='/' element={<Home loginState={[loginVal,setLoginVal]}/>}></Route>
          <Route path='/history' element={<HistoryYear loginState={[loginVal,setLoginVal]} dateCreated={[dateCreated,setDateCreated]}/>}></Route>
          <Route path='/history/:year' element={<HistoryMonth loginState={[loginVal,setLoginVal]} dateCreated={[dateCreated,setDateCreated]}/>}></Route>
          <Route path='/signup' element={<Signup loginState={[loginVal,setLoginVal]} dateCreated={[dateCreated,setDateCreated]}/>}></Route>
          <Route path='/login' element={<Login loginState={[loginVal,setLoginVal]} dateCreated={[dateCreated,setDateCreated]}/>}></Route>
          <Route path='/history/:year/:month' element={<HistoryPosts loginState={[loginVal,setLoginVal]} dateCreated={[dateCreated,setDateCreated]}/>}></Route>
          <Route path='/create' element={<CreateAndEdit loginState={[loginVal,setLoginVal]}/>}></Route>
          <Route path='/edit/:postID' element={<CreateAndEdit loginState={[loginVal,setLoginVal]}/>}></Route>
          <Route path='/write' element={<Write loginState={[loginVal,setLoginVal]}/>}></Route>
          <Route path='/view/:postID' element={<ViewPost loginState={[loginVal,setLoginVal]}/>}></Route>
          {
          /* 
          
          <Route path='play/adminQuiz' element={<Adminquiz loginState={[loginVal,setLoginVal]}/>}></Route>
          <Route path='play/adminEditQuiz/:id' element={<AdminEditQuiz loginState={[loginVal,setLoginVal]}/>}></Route>
          <Route path='play/Quiz/:id/result' element={<QuizResult loginState={[loginVal,setLoginVal]} timer={[timer,setTimer]}/>}></Route> */}
          
          
        </Routes>
        {/* <Footer/> */}
      </Router>
    </div>
  );
}

export default App;
