import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import SingleColorPalette from "./SingleColorPalette";

class App extends Component {
  constructor(props){
    super(props); 
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
    this.state = {
      palettes: savedPalettes || seedColors,
    }
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this)
  }
  savePalette(newPalette){
    this.setState({palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage)
  }
  deletePalette(paletteId){
    this.setState( st => ({
      palettes: st.palettes.filter(palette => palette.id !== paletteId)
    }), this.syncLocalStorage)
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  syncLocalStorage(){
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path='/palette/new'
          render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />}
        />
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={(routeProps) => (
            <SingleColorPalette 
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}/>
          )}
        />
        <Route
          exact
          path='/'
          render={(routeProps) => <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} />}
        />
        <Route
          exact
          path='/palette/:id'
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        
      </Switch>

    );
  }
}

export default App;

