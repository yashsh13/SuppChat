import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'jotai';
import SelectRoom from "./pages/SelectRoom";
import ChatRoom from "./pages/ChatRoom";

function App() {
  

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SelectRoom />} />
          <Route path='/chat' element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
