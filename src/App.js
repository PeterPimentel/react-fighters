import React from 'react';
import {connect as socketConnect} from './service/events'
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Routes from './routes'

function App() {
	socketConnect()
	return (
		<div className="App">
			<DndProvider backend={HTML5Backend}>
				<Routes/>
			</DndProvider>
		</div>
	);
}

export default App;
