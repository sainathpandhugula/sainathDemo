import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import AddPost from "./components/AddPatient";
import EditContact from "./components/EditPatient";
import Navbar from "./components/Navbar";
import PatientList from './components/PatientList';
import DoctorList from "./components/DoctorList";
import AddDoctor from './components/AddDoctor';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import EditDoctor from "./components/EditDoctor";
import Signup from "./components/Signup";

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer />
      <Navbar />
      
    <Routes>
    <Route  path="/" element={<Signup />} />
      <Route  path="/patient" element={<PatientList />} />
      <Route  path="/doctor" element={<DoctorList />} />
      <Route  path="/adddoctor" element={<AddDoctor />} />
      <Route  path="/add" element={<AddPost />} />
      <Route  path="/edit/:id" element={<EditContact />} />
      <Route  path="/editdoctor/:id" element={<EditDoctor />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
