import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import { Fragment } from 'react';
import Home from './components/pages/Home';
import About from './components/pages/About';

import ContactState from './context/contact/ContactState';
import './App.css';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import { redirect } from 'express/lib/response';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}
const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<Fragment className='App'>
							<Navbar />
							<div className='container'>
								<Alerts />
								<Routes>
									<Route
										path='/'
										element={
											<PrivateRoute>
												{' '}
												<Home />{' '}
											</PrivateRoute>
										}
									/>
									<Route exact path='/about' element={<About />} />
									<Route exact path='/register' element={<Register />} />
									<Route exact path='/login' element={<Login />} />
								</Routes>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
