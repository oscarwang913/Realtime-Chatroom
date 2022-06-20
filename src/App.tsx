import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {io} from "socket.io-client"

function App() {
  const [value, setValue] = useState("")
  const [chatMsg, setChatMsg] = useState<string[]>([])
  const [socket, setSocket] = useState<any>(null)
  
  useEffect(()=> {
    const socket = io("http://localhost:8080")
    setSocket(socket)
  }, [])

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket && socket.emit("chatting-message", value)
    setValue("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  socket && socket.on("chatting-message", (msg:string) => {
    setChatMsg([
      ...chatMsg,
      msg
    ])
  })
  
  return (
    <div className="App">
      {chatMsg && chatMsg.map((msg, index) => (
        <h1 key={index}>{msg}</h1>
      ))}
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange}/>
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;
