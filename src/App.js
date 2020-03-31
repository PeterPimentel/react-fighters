import React from 'react';
import {connect} from './service/events'
import 'semantic-ui-css/semantic.min.css'

import Routes from './routes'

function App() {
	connect()
	return (
		<div className="App">
			<Routes/>
		</div>
	);
}

export default App;
