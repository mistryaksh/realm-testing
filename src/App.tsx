import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./providers";
import { Homepage } from './pages'

export default function App(){
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"   element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}