import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";

const App = () => {
    const isLogged = useSelector((state) => state.user.isLogged);
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {isLogged ? (
                        <>
                            <Route path="/home" element={<Home />} />
                            <Route path="/users" element={<Users />} />
                        </>
                    ) : (
                        <Route path="*" element={<Navigate to={"/login"} />} />
                    )}
                </Routes>
            </Router>
        </>
    );
};

export default App;
