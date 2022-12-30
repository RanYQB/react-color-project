import React, { Component } from "react";
import { Link } from 'react-router-dom';
import MiniPalette from "./MiniPalette";
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteListStyles'


class PaletteList extends Component {
  
  goToPalette(id){
    this.props.history.push(`/palette/${id}`)
  }
  render() {
    const { palettes, classes , deletePalette} = this.props;
    return (
      <div className={classes.root} >
        <div className={classes.container}>
          <div className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">New palette!</Link>
          </div>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <div>
                <MiniPalette {...palette} 
                key={palette.id} 
                id={palette.id}
                handleClick={() => this.goToPalette(palette.id)}
                deletePalette={deletePalette}
                />
              </div>
              
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);