import React, { Component } from 'react';
import { Navbar, Nav } from "react-bootstrap";
import Desk from "containers/Desk";
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="AppNav">
					<Navbar bg="dark" variant="dark" expand="lg">
						<Navbar.Brand href="#home">Task Manager</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="mr-auto">
								<Nav.Link href="#home">Tasks</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</div>
				<div className="AppContent">
					<Desk />
				</div>
			</div>
		);
	}
}

export default App;
