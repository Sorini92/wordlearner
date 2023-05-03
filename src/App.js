import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import WordsPage from "./pages/WordsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Page404 from "./pages/404";
import './styles/style.scss';

function App() {
	return (
		<div className="app">
			<Router>
				<Routes>
					<Route path="/" element={<Navigate replace to='/words'/>}/>
					<Route path="/words" element={<WordsPage/>} />
					{/* <Route path="/sentences" element={<SentencesPage/>} /> */}
					<Route path="/login" element={<LoginPage/>} />
					<Route path="/register" element={<RegisterPage/>} />
					<Route path='*' element={<Page404/>}/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
