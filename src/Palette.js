import React, { Component } from 'react'
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import 'rc-slider/assets/index.css';
import './Palette.css'

class Palette extends Component {
  constructor(props){
    super(props); 
    this.state = {level: 500, format: 'hex'}
    this.changeLevel = this.changeLevel.bind(this)
    this.changeFormat = this.changeFormat.bind(this)
  }
  changeLevel(level){
    this.setState({level});
    console.log(level)
  }
  changeFormat(value){
    this.setState({format: value})
  }
  render() {
    const {level, format} = this.state;
    const colorBoxes = this.props.palette.colors[level].map(color =>
        <ColorBox background={color[format]} name={color.name}/>
      )
    return (
      <div className='Palette'>
        {/* NavBar */}
        <NavBar level={level} handleChange={this.changeLevel} changeFormat={this.changeFormat}/>
        <div className='Palette-colors'>
          {colorBoxes}    
        </div>
        {/* Footer */}
      </div>
    )
  }
}
export default Palette; 