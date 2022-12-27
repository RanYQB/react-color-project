import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    DraggableColorBox: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px", 
    }
}

function DraggableColorBox(props) {
    const {classes, color, name} = props;
    return (
        <div className={classes.DraggableColorBox} style={{backgroundColor: color}}>
            {name}
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox);