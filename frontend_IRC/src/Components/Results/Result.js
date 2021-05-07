import React, {useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Spring } from 'react-spring'



export default function Result({ i, result, roomName }){

    const [value, setvalue] = useState("");
    const [name, setname] = useState("");
    const [room, setroom] = useState(roomName);
    const [time, settime] = useState();
    console.log("RoomName: ", roomName);

    
    let client = new W3CWebSocket('ws://127.0.0.1:8000/ws/irc/' + room + '/');


    let gifSend = (data) => {

        //setGif(data)        
        client.send(JSON.stringify({
            type: "message",
            message: value,
            name: name,
            time: time,
            gif: data
        }));

    }


    return(
        <div style={{display: 'inline-block', height:"60px"}}>
        <Spring
            from={{opacity:0, transform: 'translateY(30px)'}}
            to={{ opacity:1, transform: 'translateY(0)'}}
            config={{delay: i * 100}}>
                {springProps => 
                    <div style={ springProps }>
                        <img onClick={() => gifSend(result.toJS().images.original.url)} src={ result.toJS().images.original.url } style={{height:"60px"}}/>
                    </div>
                }
            </Spring>
            </div>
    )
}