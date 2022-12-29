import React, {Component} from 'react'; 
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            background: "#800080",
            newColorName: '',
        }
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            this.props.colors.every(
              ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', value => 
          this.props.colors.every(
            ({color}) => color !== this.state.background
          )
        );
      }
    handleChangeComplete(color, event){
        this.setState({ background: color.hex });
    };
    handleChange(event){
        this.setState({
          [event.target.name]: event.target.value
        })
    }
    handleSubmit(){
        this.props.addNewColor(this.state.newColorName, this.state.background); 
        this.setState({newColorName: ''})
    }
    render(){
        const { paletteIsFull, classes } = this.props;
        const { background , newColorName } = this.state;
        return(
            <div className={classes.pickerContainer}>
                <ChromePicker 
                    color={background} 
                    onChangeComplete={this.handleChangeComplete}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        label="Color name"
                        className={classes.colorNameInput}
                        value={newColorName}
                        variant='filled'
                        margin='normal'
                        name='newColorName'
                        onChange={this.handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']}
                    />
                    <Button 
                        variant="contained" 
                        type='submit'
                        color="primary" 
                        className={classes.addColor}
                        style={{backgroundColor: paletteIsFull ? "grey" : background}}
                        disabled={paletteIsFull}
                    >
                    {paletteIsFull ? "Palette full" : "Add color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}
export default withStyles(styles)(ColorPickerForm);