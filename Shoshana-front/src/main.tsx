import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import createServices, { ServicesContext } from './services/services';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ServicesContext.Provider value={createServices('debug')}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ServicesContext.Provider>
	</React.StrictMode>,
);
