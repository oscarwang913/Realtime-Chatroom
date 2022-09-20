import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Main from './components/Main'
import { io } from "socket.io-client";

const socket = io('http://localhost:8080', {
  autoConnect: false
})
console.log(socket)

function App() {
  const handleConntion = () => {
    socket.connect();
  }
  return (
    <div className="App">
      <Navigation>
        I am nav
      </Navigation>
      <Main />
    </div>
  );
}

export default App;
