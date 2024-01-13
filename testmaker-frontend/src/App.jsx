import { Route, Routes } from 'react-router-dom';

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
    return (
        <Routes>
            <Route path="/">
                {/* PUBLIC ROUTES */}
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                {/* END PUBLIC ROUTES */}
            </Route>
        </Routes>
    );
}

export default App;