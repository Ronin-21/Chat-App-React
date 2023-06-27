import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.jsx';
import './index.css';
import { AuthContextProvider } from './context/authContext.jsx';
import { ChatContextProvider } from './context/chatContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthContextProvider>
		<ChatContextProvider>
			<React.StrictMode>
				<RouterProvider router={router} />
			</React.StrictMode>
		</ChatContextProvider>
	</AuthContextProvider>
);
