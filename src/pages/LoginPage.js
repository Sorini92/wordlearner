import { Helmet } from "react-helmet";
import Login from "../components/Login/Login";

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="login page"
                />
                <title>Login</title>
            </Helmet>
            <Login/>
        </>
    )
}

export default LoginPage;