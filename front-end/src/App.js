/**
 *  app.js
 *  @version: 1.0.0
 *  @author: trejocode - Sergio
 *  @description: Punto de Entrada de la aplicación
 * 	@process: 2
*/

import React, { Suspense } from 'react';
import Routes from './core/routes';

const App = () => {
	return(
		<div className="App">
			<Suspense fallback = { (<div></div>) }>
				<Routes></Routes>
			</Suspense>
		</div>
	);
}

export default App;
