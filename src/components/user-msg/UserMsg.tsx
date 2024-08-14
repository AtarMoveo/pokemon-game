import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";
import { Button } from "../generic-components/button/Button";
import { NavLink } from "react-router-dom";
import { font } from "../../assets/style/setup/constants";

interface UserMsgProps {
    msg: string
    onRestart: () => void
}

export function UserMsg({ msg, onRestart }: UserMsgProps) {
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = () => {
        setIsOpen(false)
        onRestart()
    }

    return (
        <Dialog sx={{'.MuiDialog-paper': {padding: '0.5rem'}}}
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', fontFamily: font.primary.regular }}>
                {msg}
            </DialogTitle>
            <DialogActions sx={{ width: "100%", justifyContent: "space-between" }}>
                <NavLink to="/myPokemons"> <Button type="primary" size="sm">My Pokemons</Button></NavLink>
                <Button type="primary" size="sm" onClick={handleClose}>Start a new fight</Button>
            </DialogActions>
        </Dialog>
    )
}