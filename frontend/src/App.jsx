import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Feed from "./pages/Feed";

function App() {

    if (window.location.pathname === "/login") {
        return <Login />;
    }

    if (window.location.pathname === "/feed") {
        return <Feed />;
    }

    return <Signup />;
}

export default App;
