import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { BasicPokemon } from '../../../data/types/pokemon';
import { StyledPopup } from './styles';
import { CloseModalX, SeparatingLine } from '../../../assets/svg/svg';

interface PopupProps {
    selectedPokemon: BasicPokemon | null
    setSelectedPokemon: Dispatch<SetStateAction<BasicPokemon | null>>
}
export function Popup({ selectedPokemon, setSelectedPokemon }: PopupProps) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (selectedPokemon) {
            setIsOpen(true)
        }
    }, [selectedPokemon])

    const handleClose = () => {
        setIsOpen(false)
        setSelectedPokemon(null)
    }

    return (
        <div>
            <StyledPopup
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className='pokemon-id'>{selectedPokemon?.id}</div>
                <DialogTitle id="alert-dialog-title">{selectedPokemon?.name}</DialogTitle>
                <DialogContent>
                    <img src={selectedPokemon?.image} alt={`${selectedPokemon?.name} image`} />
                    <DialogContentText id="alert-dialog-description">
                        <p className='pokemon-description'>{selectedPokemon?.description}</p>
                        <SeparatingLine />
                        <div className='pokemon-info'>
                            <div><h4>Height</h4><span>{selectedPokemon?.height}</span></div>
                            <div><h4>Weight</h4><span>{selectedPokemon?.weight}</span></div>
                            <div><h4>Type</h4><span>{selectedPokemon?.type.join(', ')}</span></div>
                            <div><h4>HP</h4><span>{selectedPokemon?.hpLevel}</span></div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <CloseModalX></CloseModalX>
                    </Button>
                </DialogActions>
            </StyledPopup>
        </div>
    )
}