import React from 'react'
import { Container, Grid} from '@material-ui/core'



function Loader() {
  return (
    <Container>
      <Grid
        container
        alignItems={"center"}
        justify={"center"}
        style={{ height: window.innerHeight - 50 }}
      >
        <Grid container alignItems={"center"} justifyContent={"center"}>
        <div className="loadingio-spinner-rolling-rp8p683zkp"><div className="ldio-tjj3t6oy9eq">
<div></div>
</div></div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Loader
