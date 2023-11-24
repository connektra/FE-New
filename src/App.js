// This is the main component of the webpage. All calls are handled here.
import './App.css';
import gptlogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptImgLogo from './assets/chatgptLogo.svg'
import { sendMessage } from './api';
import { fetchDataFromBackend } from './api';
import { useState, useRef, useEffect } from 'react';

function App() {
  const msgEnd=useRef(null);
  const [input, setInput]=useState('')
  const [messages, setMessages] = useState([
    {
      text:'Welcome to Connektra! How can we help you today?',
      isBot: true, 
    }
  ]);
  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  }, [messages])
  const handleSend=async()=>{
    const text=input;
    setInput('');
    setMessages([...messages, {text, isBot:false}])
    sendMessage(input);
    const res = await fetchDataFromBackend();
    setMessages([...messages, 
      {text: text, isBot: false}, 
      {text: res, isBot: true}
    ])
  }

  const handleEnter = async (e)=>{
    if(e.key==='Enter') await handleSend();
  }
  
  const handleQuery = async(e)=>{
    const text=e.target.value;
    setInput('');
    setMessages([...messages, {text, isBot:false}])
    sendMessage(input);
    const res = await fetchDataFromBackend();
    setMessages([...messages, 
      {text: text, isBot: false}, 
      {text: res, isBot: true}
    ])
  }

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptlogo} alt="Logo" className="logo" /><span className="brand">Connektra</span>
          </div>
          <div className='upperSideMid'>
              <button className="midBtn" onClick={()=> window.location.reload()}><img src={addBtn} alt="New Chat" className="addBtn" />New Chat</button>
          </div>
          <div className="upperSideBottom">
              <button className="query" value={"prompt1"} onClick={handleQuery}><img src={msgIcon} alt="Query" />Prompt1</button>
              <button className="query" value={"prompt2"} onClick={handleQuery}><img src={msgIcon} alt="Query" />Prompt2</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="" className="listitemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="" className="listitemsImg" />Save</div>
          <div className="listItems"><img src={rocket} alt="" className="listitemsImg" />Upgrade</div>

        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((message,i)=>
            <div key={i} className={message.isBot?"chat bot":"chat"}>
              <img className='chatimg' src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{message.text}</p>
            </div>
          )}
          <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder="Make a connection request..." value={input} onKeyDown={handleEnter} onChange={(e)=>setInput(e.target.value)} /> <button className="send" onClick={handleSend}><img src={sendBtn} className="sendBtn" alt="Send" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
