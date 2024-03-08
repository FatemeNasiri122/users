import React, {useContext, useState} from 'react';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UsersContext from "../context/UsersContext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function DeleteUser({user}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {deleteUser} = useContext(UsersContext)

    const handleDelete = () => {
        deleteUser(user._id);
        handleClose();
    }
    return (
        <>
            <Button variant="contained" onClick={handleOpen} color="error">delete</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Typography variant="h5" gutterBottom component="h3">
                        are you sure?
                    </Typography>
                    <Box component="div" sx={{display : "flex",
                        justifyContent : "end"
                    }}>
                        <Button onClick={handleClose} variant="contained">no</Button>
                        <Button onClick={handleDelete} variant="contained" sx={{marginLeft: "1rem"}}>yes</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default DeleteUser;