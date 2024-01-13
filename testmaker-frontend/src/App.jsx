import { Route, Routes } from 'react-router-dom';

import Home from "./components/Home";

function App() {
    return (
        <Routes>
            <Route path="/">
                {/* PUBLIC ROUTES */}
                <Route index element={<Home />} />
                {/* END PUBLIC ROUTES */}
            </Route>
        </Routes>
    );
}

export default App;