import React, { Component } from 'react';
import Slider from 'rc-slider';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import 'rc-slider/assets/index.css';
import './NavBar.css'

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {format: 'hex'}
        this.changeFormat = this.changeFormat.bind(this)
    }
    changeFormat(e){
        this.setState({format: e.target.value}); 
        this.props.changeFormat(e.target.value)
    }
    render() {
        const {level, handleChange} = this.props; 
        const {format} = this.state
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
                        <MenuItem value='hex'>HEX</MenuItem>
                        <MenuItem value='rgb'>RGB</MenuItem>
                        <MenuItem value='rgba'>RGBA</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </header>
        )
    }
}
export default NavBar;
