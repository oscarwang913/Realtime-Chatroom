import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {io} from "socket.io-client"
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';


interface ChatMessage {
  user: string,
  message: string
}

const customConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: '-',
  length: 2,
};

const shortName: string = uniqueNamesGenerator(customConfig);


function App() {
  const [value, setValue] = useState("")
  const [chatMsg, setChatMsg] = useState<ChatMessage[]>([])
  const [socket, setSocket] = useState<any>(null)
  useEffect(()=> {
    const socket = io("http://localhost:8080")
    setSocket(socket)
  }, [])

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket && socket.emit("chatting-message", {user: shortName, message: value})
    setValue("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  socket && socket.on("chatting-message", (obj:ChatMessage) => {
    setChatMsg([
      ...chatMsg, 
      obj
    ])
  })
  
  return (
    <div className="App">
      {chatMsg && chatMsg.map((obj, index) => (
        <h1 key={index} className={obj.user === shortName ? "you" : "other"}>{obj.user} {obj.message}</h1>
      ))}
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange}/>
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;
