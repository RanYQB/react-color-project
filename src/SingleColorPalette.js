import React, {Component} from 'react'; 
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteStyles';

class SingleColorPalette extends Component{
    constructor(props){
        super(props);
        this._shades = this.gatherColors(this.props.palette, this.props.colorId);
        this.state = {format: "hex"}
        this.changeFormat = this.changeFormat.bind(this);
    }
    gatherColors(palette, colorToFilterBy){
        let shades = [];
        let allColors = palette.colors; 
        for (let key in allColors ){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return shades.slice(1);
    }
    changeFormat(val) {
        this.setState({ format: val });
      }
    render(){
        const {paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props;
        const colorBoxes = this._shades.map(color => 
            <ColorBox 
            key={color.name} 
            name={color.name} 
            background={color[this.state.format]}  
            showingFullPalette={false}/>
            )
        return(
            <div className={classes.palette}>
                <NavBar
                handleChange={this.changeFormat}
                showSlider={false}
                />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} className={classes.backButton}>Go back !</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}
export default withStyles(styles)(SingleColorPalette); 