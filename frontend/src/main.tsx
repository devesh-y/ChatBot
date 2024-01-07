import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "@/pages/LoginPage.tsx";
import {ChatPage} from "@/pages/ChatPage.tsx";
import {HomePage} from "@/pages/HomePage.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(

      <BrowserRouter>
          <Routes>
                  <Route path={"/"} element={<HomePage/>}>
                      <Route path={"login"} element={<LoginPage/>}/>
                      <Route path={"chat"} element={<ChatPage/>}/>
                  </Route>
                  <Route path={"/*"} element={<Navigate to={"/login"} replace={true}/>} />
          </Routes>
      </BrowserRouter>

)
