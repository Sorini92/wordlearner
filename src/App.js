import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import './styles/style.scss';

const WordsPage = lazy(() => import("./pages/WordsPage"))
const Page404 = lazy(() => import("./pages/404"))

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
					{/* <Route 
						path="/sentences" 
						element={<Suspense fallback={<Spinner/>}><SentencesPage/></Suspense>}
					/> */}
					<Route path="/login" element={<LoginPage/>} />
					<Route path="/register" element={<RegisterPage/>} />
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
