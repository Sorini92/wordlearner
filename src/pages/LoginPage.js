import { Link } from "react-router-dom";
import Login from "../components/Login/Login";

const LoginPage = () => {
    return (
        <div className="logregpage">
            <Login/>
            <p style={{textAlign: "center"}}>
                or <Link to="/register">register</Link>
            </p>
        </div>
    )
}

export default LoginPage;