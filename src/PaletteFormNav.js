
import React, {Component} from 'react'; 
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteFormNavStyles';
import { AddToPhotos } from '@material-ui/icons';

class PaletteFormNav extends Component{
    constructor(props){
        super(props);
        this.state = {dialogShowing: false}
        this.handleChange = this.handleChange.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }
    
    handleChange(event){
        this.setState({
          [event.target.name]: event.target.value
        })
    }
    showDialog(){
        this.setState({dialogShowing: true})
    }
    closeDialog(){
        this.setState({dialogShowing: false});
      };
    render(){
        const { classes , open , handleDrawerOpen , handleSubmit , palettes} = this.props;
        const { dialogShowing } = this.state; 
 
        return(
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
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open 
                            }
                                )}
                        >
                            <AddToPhotos />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create your palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to='/'>
                            <Button variant='contained' className={classes.button} color='secondary'>go back</Button>
                        </Link>
                        <Button variant="contained" className={classes.button} color="primary" onClick={this.showDialog}>
                            Save palette
                        </Button>
                    </div>
                </AppBar>
                { this.state.dialogShowing && ( 
                <PaletteMetaForm 
                    open={dialogShowing} 
                    handleSubmit={handleSubmit}
                    handleClose={this.closeDialog} 
                    palettes={palettes}/> 
                    
                )}
            </div>
        )
    }
}
export default withStyles(styles, {withTheme: true})(PaletteFormNav);