import React, {useContext, useState} from 'react';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UsersContext from "../context/UsersContext";
import {TextField} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '60%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function ItemForm({type,user}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {updateUsers, addUsers} = useContext(UsersContext)
    const [name,setName] = useState(user?.name ? user.name : "");
    const [email, setEmail] = useState(user?.email ? user.email : "");
    const [job,setJob] = useState(user?.job ? user.job : "");
    const [validName,setValidName] = useState(true);
    const [validEmail,setValidEmail] = useState(true);
    const [validJob,setValidJob] = useState(true);
    
    const newUser = {
        name,
        email,
        job
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        if (name === ''){
            setValidName(false)
        }else if (email === '' || regexEmail === false){
            setValidEmail(false)
        }else if (job === ''){
            setValidJob(false)
        }else {
            setValidName(true)
            setValidEmail(true)
            setValidJob(true)
            if (type === "edit") {
                updateUsers(user._id,newUser)
            } else {
                addUsers(newUser);
            }
            handleClose();
        }
    }
    return (
        <>
            <Button variant="contained" onClick={handleOpen}>{ type }</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Box component="div" sx={{display : "flex",
                        justifyContent : "end"
                    }}>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Typography component='p' variant='box1'>
                            {type} user:
                        </Typography>
                            <TextField
                                margin="normal"
                                error={validName ? false: true}
                                label="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                helperText={validName ? '': "Incorrect entry."}
                                fullWidth
                            />
                            <TextField
                                margin="normal"
                                error={validEmail ? false: true}
                                label="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                helperText={validEmail ? '': "Incorrect entry."}
                                fullWidth
                            />
                            <TextField
                                margin="normal"
                                error={validJob ? false: true}
                                label="job"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                                helperText={validJob ? '': "Incorrect entry."}
                                fullWidth
                            />
                        <div>
                            <Button type="submit" variant="contained">submit</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default ItemForm;