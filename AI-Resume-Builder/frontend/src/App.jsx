import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

    const user = localStorage.getItem("user");

    return (

        <BrowserRouter>

            <Routes>

                {/* Login */}
                <Route
                    path="/"
                    element={<Login />}
                />

                {/* Register */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        user
                            ? <Dashboard />
                            : <Navigate to="/" />
                    }
                />

                {/* Unknown Routes */}
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;