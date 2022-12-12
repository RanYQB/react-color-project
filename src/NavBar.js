import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './NavBar.css'

class NavBar extends Component {
    constructor(props){
        super(props);
        
    }
    render() {
        const {level, handleChange} = this.props; 
        return (
        <div className='NavBar'>
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
        )
    }
}
export default NavBar;
