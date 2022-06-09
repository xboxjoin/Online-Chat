import "../App.css";
import {Container, Grid} from "@mui/material";

const Loader = () => {

    return (
        <Container>
            <Grid
                container
                style = {{height: window.innerHeight - 50}}
                alignItems="center"
                justifyContent="center"
            >
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

            </Grid>
        </Container>
    )
}

export default Loader;