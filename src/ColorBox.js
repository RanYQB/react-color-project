import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import './ColorBox.css'

class ColorBox extends Component {
  constructor(props){
    super(props);
    this.state= {copied: false}
    this.handleCopy = this.handleCopy.bind(this)
  }
  handleCopy(){
    this.setState({copied: true}, ()=>{
      setTimeout(() => this.setState({copied: false}), 1500)
    })
  }
  render() {
    const {name, background} = this.props;
    const {copied} = this.state;
    return (
        <CopyToClipboard text={background} onCopy={this.handleCopy}>
      <div className='ColorBox' style={{background}}>
        <div style={{background}} className={`ColorBox-copy-overlay ${copied && 'show'}`}/>
        <div className={`ColorBox-copy-msg ${copied && 'show'}`}>
          <h1>Copied!</h1>
          <p>{background}</p>
        </div>
        <div className='ColorBox-copy-container'>
            <div className='ColorBox-box-content'>
                <span>{name}</span>
            </div>
            <button className='ColorBox-copy-btn'>Copy</button>
        </div>
        <span className='ColorBox-see-more'>MORE</span>
      </div>
      </CopyToClipboard>
    )
  }
}
export default ColorBox;