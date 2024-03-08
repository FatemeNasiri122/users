import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import ItemForm from "./ItemForm";
import DeleteUser from './DeleteUser';
import { Box } from '@mui/material';

function Item({ user }) {
    
    return (
        <Grid item lg={3} sm={6} xs={12}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom component="h3">
                        {user?.name}
                    </Typography>
                    <Typography variant="body1" component="p" sx={{ color: 'info.main' }}>
                        {user?.job}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" marginTop={1}>
                        {user?.email}
                    </Typography>
                </CardContent>
                <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
                    <CardActions>
                    <ItemForm type="edit" user={user}/>
                </CardActions>
                <CardActions>
                    <DeleteUser user={user}/>
                </CardActions>
                </Box>
            </Card>
        </Grid>
    );
}

export default Item;