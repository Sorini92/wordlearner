import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import './styles/style.scss';
import Header from "./components/Header/Header";

const WordsPage = lazy(() => import("./pages/WordsPage"))
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"))
const Page404 = lazy(() => import("./pages/404"))
const SentencesPage = lazy(() => import("./pages/SentencesPage"))
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const IrregularVerbsPage = lazy(() => import("./pages/IrregularVerbsPage"))

function App() {
	return (
		<div className="app">
			<Router>
				<Suspense fallback={<Spinner/>}>
					<Header/>
					<Routes>
						<Route path="/" element={<Navigate replace to='/words'/>}/>
						<Route path="/words" element={<WordsPage/>}/>
						<Route path="/words/favorites" element={<FavoritesPage/>}/>
						<Route path="/words/irregular" element={<IrregularVerbsPage/>}/>
						<Route path="/sentences" element={<SentencesPage/>}/>
						<Route path="/login" element={<LoginPage/>}/>
						<Route path="/register" element={<RegisterPage/>}/>
						<Route path="*" element={<Page404/>}/>
					</Routes>
				</Suspense>
			</Router>
		</div>
	);
}

export default App;
