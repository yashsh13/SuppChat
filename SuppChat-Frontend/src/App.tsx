import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectRoom from "./pages/SelectRoom";
import ChatRoom from "./pages/ChatRoom";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SelectRoom />} />
        <Route path='/chat' element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
