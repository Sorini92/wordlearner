import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WordsPage from "./pages/WordsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import './styles/style.scss';

function App() {
	return (
		<div className="app">
			<Router>
				<Routes>
					<Route path="/" element={<WordsPage/>} />
					<Route path="/login" element={<LoginPage/>} />
					<Route path="/register" element={<RegisterPage/>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
