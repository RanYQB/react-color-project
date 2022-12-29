import React, {Component} from 'react'; 
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import styles from './styles/NewPalettteFormStyles'

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  constructor(props){
    super(props);
    this.state = {
        open: false, 
        colors: this.props.palettes[0].colors
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteColor = this.deleteColor.bind(this);
    this.clearColors = this.clearColors.bind(this); 
    this.addRandomColor = this.addRandomColor.bind(this);
  }
  
  handleDrawerOpen () {
    this.setState({open: true});
  };

  handleDrawerClose () {
    this.setState({open: false});
  };

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addNewColor(colorName, background){
    const newColor = {
        color: background, 
        name: colorName
    }
    this.setState({colors: [...this.state.colors, newColor]})
  }
  handleSubmit(newPaletteName, selectedEmoji){
    const newPalette = {
      paletteName: newPaletteName, 
      emoji: selectedEmoji,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    }
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }
  deleteColor(colorName){
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName )
    })
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };
  clearColors(){
    this.setState({colors: []})
  }
  addRandomColor(){
    const allColors = this.props.palettes.map(p => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState({colors: [...this.state.colors, randomColor]})
  }
  render(){
    const { classes, maxColors, palettes } = this.props;
    const { open, background, colors, newColorName } = this.state;
    const paletteIsFull = colors.length >= maxColors;
  return (
    <div className={classes.root}>
      <PaletteFormNav 
        open={open} 
        handleDrawerOpen={this.handleDrawerOpen}
        palettes={palettes}
        handleSubmit={this.handleSubmit}/>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
             <ChevronLeftIcon /> 
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
              Design your palette
          </Typography>
          <div className={classes.buttons}>
              <Button 
                variant="contained" 
                className={classes.button}
                color="secondary" 
                onClick={this.clearColors}>
                  Clear palette
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick={this.addRandomColor}
                disabled={paletteIsFull}>
                  Random color
              </Button>
          </div>
          <ColorPickerForm 
            paletteIsFull={paletteIsFull}
            colors={colors}
            addNewColor={this.addNewColor}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList 
        colors={colors} 
        deleteColor={this.deleteColor}
        axis="xy"
        onSortEnd={this.onSortEnd}
        />  
      </main>
    </div>
  )};
}


export default withStyles(styles, {withTheme: true} )(NewPaletteForm);