import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import './styles/style.scss';

const WordsPage = lazy(() => import("./pages/WordsPage"))
const Page404 = lazy(() => import("./pages/404"))
const SentencesPage = lazy(() => import("./pages/SentencesPage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))

function App() {
	return (
		<div className="app">
			<Router>
				<Routes>
					<Route path="/" element={<Navigate replace to='/words'/>}/>
					<Route 
						path="/words" 
						element={<Suspense fallback={<Spinner/>}><WordsPage/></Suspense>}
					/>
					<Route 
						path="/sentences" 
						element={<Suspense fallback={<Spinner/>}><SentencesPage/></Suspense>}
					/>
					<Route 
						path="/login" 
						element={<Suspense fallback={<Spinner/>}><LoginPage/></Suspense>}
					/>
					<Route 
						path="/register" 
						element={<Suspense fallback={<Spinner/>}><RegisterPage/></Suspense>}
					/>
					<Route 
						path="*" 
						element={<Suspense fallback={<Spinner/>}><Page404/></Suspense>}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
