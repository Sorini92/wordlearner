import { Link } from "react-router-dom";
import SignUp from "../components/SignUp/SignUp";

const RegisterPage = () => {
    return (
        <div className="logregpage">
            <SignUp/>
            <p style={{textAlign: "center"}}>
                Already have an account? <Link to='/login'>Sign in</Link>
            </p>
        </div>
    )
}

export default RegisterPage;