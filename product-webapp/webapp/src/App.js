import './App.css';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Welcome from './pages/welcome/Welcome';
import Institute from './pages/Institute/Institute';
import JobSeeker from './pages/Job-Seeker/JobSeeker';
import Employee from './pages/Employee/Employee';
import Help from './pages/Help/Help'


function App() {
  return (
   <>

<BrowserRouter>

      <Routes>
        <Route path="/" element={<Welcome/>}> </Route>
      </Routes>
        

      <Routes>
        <Route path="/institute" element={<Institute/>}> </Route>
        <Route path="/jobseeker" element={<JobSeeker/>}> </Route>
        <Route path="/employee" element={<Employee/>}> </Route>
        <Route path="/help" element={<Help/>}> </Route>

      </Routes>


</BrowserRouter>
 
    </>
  );
}

export default App;
