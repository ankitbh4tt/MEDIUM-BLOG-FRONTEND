import './App.css'
import {Route,Routes} from 'react-router-dom'
import Blogs from './pages/Blogs'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for default styling 
import Navbar from './components/Navbar'
import AddNewBlog from './pages/AddNewBlog'
import Logout from './pages/Logout'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Blogs/>}/>
        <Route path='blog/:id' element={<Blog/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/newBlog' element={<AddNewBlog/>}/>
        <Route path='/logout' element={<Logout/>} />
        {/* <Route path='/blog/:id' element={<Blog />}/> */}
        <Route path='/*' element={<Signin/>} />
      </Routes>
      <ToastContainer // Add ToastContainer here
        position="top-left" // Position of toasts
        autoClose={5000} // Auto-close after 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Older toasts on top
        closeOnClick // Close toast on click
        rtl={false} // Left-to-right text
        pauseOnFocusLoss // Pause when window loses focus
        draggable // Allow dragging to dismiss
        pauseOnHover // Pause on hover
      />
    </>
  )
}

export default App
