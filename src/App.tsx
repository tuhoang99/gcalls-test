import { Route, Routes } from 'react-router-dom';
import CallLayout from './layouts/callLayout';
import HomeLayout from './layouts/homeLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout/>}/>
      <Route path="/call" element={<CallLayout/>}/>       
    </Routes>
  );
}

export default App;
