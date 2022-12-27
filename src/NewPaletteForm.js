import React, {Component} from 'react'; 
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
  constructor(props){
    super(props);
    this.state = {
        open: false, 
        background: "#800080",
        newName: '',
        colors: [{name: 'black', color: '#000000'}]
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleInputChange(event){
    this.setState({newName: event.target.value})
  }

  addNewColor(event){
    event.preventDefault()
    const newColor = {
        color: this.state.background, 
        name: this.state.newName
    }
    this.setState({colors: [...this.state.colors, newColor], newName: ''})
  }
  handleSubmit(){
    let newName = 'New test Palette'
    const newPalette = {
      paletteName: newName, 
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    }
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }
  render(){
    const {classes } = this.props;
    const { open, background, colors, newName } = this.state;
    
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color='default'
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <Button variant='contained' color='primary' onClick={this.handleSubmit}>Save palette</Button>
        </Toolbar>
      </AppBar>
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
            <Button variant="contained" color="secondary">Clear palette</Button>
            <Button variant="contained" color="primary">Random color</Button>
        </div>
        <ChromePicker 
            color={background} 
            onChangeComplete={this.handleChangeComplete}
        />
        <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
                value={newName}
                onChange={this.handleInputChange}
                validators={['required', 'isColorNameUnique', 'isColorUnique']}
                errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']}
            />
            <Button 
                variant="contained" 
                type='submit'
                color="primary" 
                style={{background: background}}
            >Add color!</Button>
        </ValidatorForm>
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        { colors.map( c =>
            (<DraggableColorBox color={c.color} name={c.name}/>)
            )}
      </main>
    </div>
  )};
}


export default withStyles(styles, {withTheme: true} )(NewPaletteForm);