import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/'>
			<Route
				index
				element={
					<PrivateRoute>
						<Home />
					</PrivateRoute>
				}
			/>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
		</Route>
	)
);
