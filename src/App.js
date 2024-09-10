import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Signup from './pages/Signup';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import MyProfile from './components/core/Dashboard/MyProfile';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import PrivateRoute from './components/core/auth/PrivateRoute';
import Settings from './components/core/Dashboard/Settings';
import MyForm from './Formhook';
import EnrolledCourses from './components/EnrolledCourses';
import Cart from './components/core/Dashboard/cart';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import AddCourse from './components/core/Dashboard/addCourse';
import MyCourses from './components/core/Dashboard/MyCourses';
import EditCourse from './components/core/Dashboard/editCourse';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import Temp from './components/Temp';
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor';
import OpenRoute from './components/core/auth/OpenRoute';
import About from './pages/About';
import Contact from './pages/Contact';


function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter bg-richblack-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path='catalog/:catalogName' element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route path='/about' element={
          <About />
        } />

        <Route path="/contact" element={<Contact />} />

        <Route element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>}>

          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT &&
            (<>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>)
          }

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
            (<>
              <Route path="/dashboard/add-course" element={<AddCourse />} />
              <Route path="/dashboard/my-courses" element={<MyCourses />} />
              <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
              <Route path="/dashboard/instructor" element={<Instructor />} />
            </>)
          }


        </Route>

        <Route path="/form" element={<MyForm />} />

        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />} />
            </>
          )}
        </Route>

        <Route path="*" element={<Error />} />
        <Route path="/temp" element={<Temp />} />
      </Routes>
    </div >
  );
}

export default App;
