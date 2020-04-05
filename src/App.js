import React from 'react';
import { connect as socketConnect } from './service/events'
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import GlobalStyle from './styles/global'

import Routes from './routes'

function App() {
	socketConnect()
	return (
		<DndProvider backend={HTML5Backend}>
			<div className="App">
				<GlobalStyle/>
				<Routes />
			</div>
		</DndProvider>
	);
}

export default App;
