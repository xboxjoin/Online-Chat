import React, {useContext, useState} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Avatar, Button, Container, Grid, TextField} from "@mui/material";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import firestore from "firebase/compat/app";
import '../styles/Chat.css'

const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value,setValue] = useState("");
    const [messages,loading] = useCollectionData(firestore.collection('messages').orderBy('createdAt'))


    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue("");
    }

    if(loading){
        return <Loader/>
    }

    return (
        <Container className="back">
            <Grid container
                  style = {{height:window.innerHeight-50, display: 'flex', alignItems:'center'}}
                  alignItems={"flex"}
                  justifyContent={"center"}
                  direction={"column"}>
                <div className= "main__container" style ={{width: '80%', height: '70vh', overflowY: 'auto'}} scrolling="auto">
                    {messages.map(message => {
                        if(!(user.uid === message.uid)) {
                            return <div className="client">
                                <div className="client__container">
                                    <Avatar className="client__avatar" src = {message.photoURL}/>
                                    <div className="client__name">{message.displayName}</div>
                                    <div className="client__message"><span>{message.text}</span></div>
                                </div>
                            </div>
                        }
                        else {
                            return <div className="client">
                                <div className="left">
                                    <div className="client__name">{message.displayName}</div>
                                    <Avatar className="client__avatar" src = {message.photoURL}/>
                                    <div className="client__message"><span>{message.text}</span></div>
                                </div>
                            </div>
                        }
                    }
                    )}
                </div>
                <Grid container
                      direction="column"
                      alignItems="flex-end"
                      style ={{width:'80%'}}
                >
                    <TextField fullWidth
                               color="warning"
                               variant={"outlined"}
                               label="Отправь сообщение нигеру"
                               style={{margin:'20px 0px 20px 0px'}}
                               rows={2}



                               multiline
                               value = {value}

                               onChange = {(e) => setValue(e.target.value)}
                               onKeyPress={(e) => {if(e.key ==='Enter') sendMessage()}}
                    />
                    <Button onClick = {sendMessage}style={{margin:'0px'}} variant="contained">Отправить</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Chat;