import { useState, useEffect, useRef } from 'react';
import './App.css';
import {io} from "socket.io-client"
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';


interface ChatMessage {
  senderId: string,
  message: string
}

interface Users {
  userId: string,
  socketId: string
}

const customConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: '-',
  length: 2,
};

const shortName: string = uniqueNamesGenerator(customConfig);
console.log(shortName)

function App() {
  const [value, setValue] = useState("")
  const [chatMsg, setChatMsg] = useState<any>([])
  const [users, setUsers] = useState<Users[]>([])
  const socket = useRef<any>()
  const [arrivalMessage, setArrivalMessage] = useState<any>([])
  
  useEffect(() => {
    console.log(1)
    socket.current = io("http://localhost:8080")

    socket.current.on('getMessage', (data: ChatMessage) => {
      console.log(data)
      setChatMsg([{
        senderId: data.senderId,
        message: data.message
      }])
    })
  }, [])

  useEffect(() => {
    setArrivalMessage([...arrivalMessage, ...chatMsg])
  }, [chatMsg])

  useEffect(() => {
    console.log(2)
    socket.current.emit('addUser', shortName)
    socket.current.on('getUsers', (onlineUsers: Users) => {
      const onlineU = users.concat(onlineUsers)
      setUsers(onlineU)
    })
  }, [shortName])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const getReceiver = () => {
    const receiver = users?.find(user => user.userId !== shortName)
    return receiver?.userId
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const receiverId = getReceiver()
    socket.current.emit('sendMessage', {
      senderId: shortName,
      receiverId,
      message: value
    })
 }
 console.log(chatMsg)
 console.log(arrivalMessage)
  return (
    <div className="App">
      {users.length > 0 && users.map((user:Users, index: any) => (<h1 className="name" key={index}>{user.userId}</h1>))}
      {arrivalMessage.length > 0 && arrivalMessage.map((message:ChatMessage, index:number) => (<h3 key={index}>{message.message}</h3>))}
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange}/>
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;
