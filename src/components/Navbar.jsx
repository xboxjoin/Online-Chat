import React, {useContext} from "react";
import {AppBar, Button, createTheme, Grid, Toolbar} from "@mui/material";
import '../App.css';
import {yellow} from "@mui/material/colors";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {NavLink} from "react-router-dom";



const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: yellow[500],
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
});


const Navbar = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    return (
        <AppBar color={"secondary"} position="static" color="inherit" style = {{
            boxShadow: "0px 0px 12px 0px rgba(34, 60, 80, 0.72)",
            backgroundColor: 'inherit', display: 'flex', alignItems:'flex-end', justifyContent:'flex-end'}}>
            <Toolbar variant={"dense"}>
                <Grid container justify={"flex-end"}>
                    {user ?
                        <Button onClick={() => auth.signOut()} variant={"outlined"} style = {{marginTop:'10px', marginBottom: '10px', color: 'white'}}>Log Out</Button>
                        :
                        <NavLink to={'/login'}>
                            <Button variant={"contained"} style = {{color: 'white',textDecoration:'none'}}>Login</Button>
                        </NavLink>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;