import React, { Component } from 'react'
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import 'rc-slider/assets/index.css';
import './Palette.css'

class Palette extends Component {
  constructor(props){
    super(props); 
    this.state = {level: 500}
    this.changeLevel = this.changeLevel.bind(this)
  }
  changeLevel(level){
    this.setState({level});
    console.log(level)
  }
  render() {
    const {level} = this.state;
    const colorBoxes = this.props.palette.colors[level].map(color =>
        <ColorBox background={color.hex} name={color.name}/>
      )
    return (
      <div className='Palette'>
        {/* NavBar */}
        <NavBar level={level} handleChange={this.changeLevel}/>
        <div className='Palette-colors'>
          {colorBoxes}    
        </div>
        {/* Footer */}
      </div>
    )
  }
}
export default Palette; 