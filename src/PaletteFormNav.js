
import React, {Component} from 'react'; 
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


class PaletteFormNav extends Component{
    constructor(props){
        super(props);
        this.state = {
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
          this.props.palettes.every(
            ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
          )
        );
    }
    handleChange(event){
        this.setState({
          [event.target.name]: event.target.value
        })
    }
    render(){
        const {classes , open , handleDrawerOpen , handleSubmit} = this.props;
        const { newPaletteName } = this.state;
        return(
            <div>
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
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Persistent drawer
                        </Typography>
                        
                        <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                            <TextValidator
                                label="Palette name"
                                value={newPaletteName}
                                name='newPaletteName'
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Enter a palette name', 'Palette name must be unique']}
                            />
                            <Button type='submit' variant='contained' color='primary'>Save palette</Button>
                        </ValidatorForm>
                        <Link to='/'>
                            <Button variant='contained' color='secondary'>go back</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default PaletteFormNav;