import { Helmet } from "react-helmet";
import SignUp from "../components/SignUp/SignUp";

const RegisterPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="register page"
                />
                <title>Register</title>
            </Helmet>
            <SignUp/>
        </>
    )
}

export default RegisterPage;