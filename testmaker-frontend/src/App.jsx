import { Route, Routes } from 'react-router-dom';

import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import Prefetch from "./features/auth/Prefetch";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Portal from "./components/Portal";

function App() {
    return (
        <Routes>
            <Route path="/">
                {/* PUBLIC ROUTES */}
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                {/* END PUBLIC ROUTES */}

                {/* PRIVATE ROUTES */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route element={<Prefetch />}>
                            <Route path="portal">
                                <Route index element={<Portal />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
                {/* END PRIVATE ROUTES */}
            </Route>
        </Routes>
    );
}

export default App;