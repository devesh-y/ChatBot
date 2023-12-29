import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "@/pages/LoginPage/LoginPage.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <Routes>
          <Route path={"/login"} element={<LoginPage/>}/>
          <Route path={"/*"} element={<Navigate to={"/login"} replace={true}/>} />
      </Routes>
  </BrowserRouter>
)
