import React, {Component} from 'react'; 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
  

class PaletteMetaForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            stage: "form",
            emoji: '',
            newPaletteName: ""
        }
       
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
          this.props.palettes.every(
            ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
          )
        );
    }
    handleChange(event){
        this.setState({
          [event.target.name]: event.target.value
        })
    }
    showEmojiPicker(){
        this.setState({stage: "emoji"})
    }
    handleSubmit(emoji){
        this.setState({emoji: emoji.native})
        this.props.handleSubmit(this.state.newPaletteName, this.state.emoji)
    }
    render(){
        const { newPaletteName , stage } = this.state; 
        const { handleSubmit , open , handleClose } = this.props;
        return (
            <div>
                <Dialog 
                open={stage === "emoji"}
                onClose={handleClose} 
                aria-labelledby="emoji-dialog-title">
                    <DialogTitle id="emoji-dialog-title">Choose a palette emoji</DialogTitle>
                    <Picker data={data} onEmojiSelect={this.handleSubmit} />
                </Dialog>
                <Dialog 
                open={stage === "form"} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
                    
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                        Please enter a name for your palette. Make sure it's unique.
                        </DialogContentText>
                        
                            <TextValidator
                                label="Palette name"
                                value={newPaletteName}
                                name='newPaletteName'
                                fullWidth
                                margin="normal"
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Enter a palette name', 'Palette name must be unique']}
                            />
                            
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button type='submit' variant='contained' color='primary'>Save palette</Button>
                    </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
    
}
export default PaletteMetaForm