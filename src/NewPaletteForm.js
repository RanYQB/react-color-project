import React, {Component} from 'react'; 
import PaletteFormNav from './PaletteFormNav';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    height: 'calc(100vh - 64px)',
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  constructor(props){
    super(props);
    this.state = {
        open: false, 
        background: "#800080",
        newColorName: '',
        colors: this.props.palettes[0].colors
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteColor = this.deleteColor.bind(this);
    this.clearColors = this.clearColors.bind(this); 
    this.addRandomColor = this.addRandomColor.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value => 
        this.state.colors.every(
          ({name}) => name.toLowerCase() !== value.toLowerCase()
        )
    );
    ValidatorForm.addValidationRule('isColorUnique', value => 
      this.state.colors.every(
        ({color}) => color !== this.state.background
      )
    );
  }
  handleDrawerOpen () {
    this.setState({open: true});
  };

  handleDrawerClose () {
    this.setState({open: false});
  };

  handleChangeComplete(color, event){
    console.log(color.hex)
    this.setState({ background: color.hex });
  };

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addNewColor(event){
    event.preventDefault()
    const newColor = {
        color: this.state.background, 
        name: this.state.newColorName
    }
    this.setState({colors: [...this.state.colors, newColor], newColorName: ''})
  }
  handleSubmit(newPaletteName){
    const newPalette = {
      paletteName: newPaletteName, 
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
        classes={classes} 
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
        <Typography variant="h4">
            Design your palette
        </Typography>
        <div>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={this.clearColors}>
                Clear palette
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={this.addRandomColor}
              disabled={paletteIsFull}>
                Random color
            </Button>
        </div>
        <ChromePicker 
            color={background} 
            onChangeComplete={this.handleChangeComplete}
        />
        <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
                label="Color name"
                value={newColorName}
                name='newColorName'
                onChange={this.handleChange}
                validators={['required', 'isColorNameUnique', 'isColorUnique']}
                errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']}
            />
            <Button 
                variant="contained" 
                type='submit'
                color="primary" 
                style={{backgroundColor: paletteIsFull ? "grey" : background}}
                disabled={paletteIsFull}
            >
              {paletteIsFull ? "Palette full" : "Add color"}
            </Button>
        </ValidatorForm>
        
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