import React, { Component } from 'react';
import Slider from 'rc-slider';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'rc-slider/assets/index.css';
import './NavBar.css'

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {format: 'hex', open: false}
        this.changeFormat = this.changeFormat.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    handleClose(){
        this.setState({open: false})
    }
    changeFormat(e){
        this.setState({format: e.target.value, open: true}); 
        this.props.changeFormat(e.target.value)
    }
    render() {
        const {level, handleChange} = this.props; 
        const {format, open} = this.state
        return (
        <header className='NavBar'>
            <div className='NavBar-logo'>
                <a href="#">ReactColorPicker</a>
            </div>
            <div className='NavBar-slider-container'>
                <span>Level : {level}</span>
                <div className='slider'>
                    <Slider
                    defaultValue={level}
                    min={100}
                    max={900}
                    step={100}
                    onChange={handleChange}
                    />
                </div>
            </div>
            <div className='NavBar-select-container'>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select 
                    id="demo-simple-select-standard"
                    value={format}
                    onChange={this.changeFormat}>
                        <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Snackbar 
                anchorOrigin={{vertical: "bottom", horizontal: "left" }} 
                open={open}
                autoHideDuration={3000}
                message={<span>Format changed to {format.toUpperCase()}</span>}
                id='message-id'
                ContentProps={{
                    'aria-describedby': 'message-id'
                }}
                onClose={this.handleClose}
                action={[
                    <IconButton onClick={this.handleClose} key='close' aria-label='close'>
                        <CloseIcon/>
                    </IconButton>
                ]}
            />
        </header>
        )
    }
}
export default NavBar;
