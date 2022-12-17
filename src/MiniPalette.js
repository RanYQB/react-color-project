import React from 'react'; 
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        backgroundColor: 'white', 
        padding: '0.5rem', 
        position: 'relative', 
        borderRadius: '5px',
        border: '1px solid lightgray', 
        overflow: 'hidden', 
        "&:hover": {
            cursor: 'pointer'
        }
    }, 
    colors: {
        backgroundColor: '#dae1e4', 
        height: '100px', 
        width: '100%',
        borderRadius: '5px', 
        overflow: 'hidden'
    },
    color: {
        height: '25%', 
        width: '20%'
    }, 
    title: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        margin: '0', 
        color: 'black', 
        paddingTop: '0.5rem', 
        fontSize: '0.9rem', 
        position: 'relative'
    }, 
    emoji: {
        marginLeft: '0.5rem',
        fontSize: '1.3rem'
    },
    miniColor: {
        height: '25%',
        width: '20%', 
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative', 
        marginBottom: '-4px'
    }
}

function MiniPalette(props){
    const {classes, paletteName , emoji , colors} = props;
    const miniColorBoxes = colors.map(color => (
        <div className={classes.miniColor} style={{backgroundColor: color.color}} key={color.name}/>
    ))
    return(
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>{paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    )
}
export default withStyles(styles)(MiniPalette);