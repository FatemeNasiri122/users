import React, {useContext} from 'react';
import UsersContext from "../context/UsersContext";
import Item from '../item/Item'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ItemForm from '../item/ItemForm';

function Home() {
    const { users, isLoading, isError } = useContext(UsersContext);
    
    if (isLoading){
        return <Container sx={{paddingTop: 10}}>
            <h1>loading...</h1>
        </Container>
    } else if (isError) {
        return <Container sx={{ paddingTop: 10 }}>
            <h1>Error in loading data</h1>
        </Container>
    }
    return (
        <Container>
            <ItemForm type="add" user={null}/>
            <Grid container spacing={2} marginTop={2} marginBottom={2}>
            {users.map((user) =>(
                    <Item key={user?.id} user={user}/>
                ))}
            </Grid>
        </Container>
    )

};

export default Home;