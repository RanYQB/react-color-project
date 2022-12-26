import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%', 
    height: '100vh',
    backgroundColor: 'blue', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'flex-start'
  }, 
  container: {
    width: '50%', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'flex-start'

  }, 
  nav: {
    color: 'white', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%'
    
  },
  palettes: {
    boxSizing: 'border-box', 
    width: '100%',
    display: 'grid', 
    gridTemplateColumns: 'repeat(3, 30%)', 
    gridGap: '5%'
  }
}

class PaletteList extends Component {
  goToPalette(id){
    this.props.history.push(`/palette/${id}`)
  }
  render() {
    const { palettes, classes } = this.props;
    return (
      <div className={classes.root} >
        <div className={classes.container}>
          <div className={classes.nav}>
            <h1>React Colors</h1>
            <span>New palette!</span>
          </div>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <div>
                <MiniPalette {...palette} key={palette.id} handleClick={() => this.goToPalette(palette.id)}/>
              </div>
              
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);