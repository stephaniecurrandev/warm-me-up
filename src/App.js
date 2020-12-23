import React from 'react';
import {getWarmup, playExercise} from "./scales";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './App.css';

const scales = getWarmup([0,2,4,7,4,2,0]);
const descend = getWarmup([4,3,2,1,0])

const exerciseMap = {scales, descend};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      exerciseKey: "descend",
      exercise: descend
    };
  }

  handleClickPlay= ()=> {
    playExercise(this.state.exercise[this.state.index]);
  }

  handleClickPrev= ()=>{
    let next = this.state.index - 1;
    if(next < 0) next = 0;
    this.setState({index: next});
  }

  handleClickNext= ()=> {
    const next = this.state.index + 1;
    this.setState({index: next});
  }
  
  handleClickFirstNote= ()=> {
    playExercise([this.state.exercise[this.state.index][0]])
  }

  handleChangeExercise= (e)=> {
    const exerciseKey = e.target.value;
    this.setState({
      exerciseKey,
      exercise: exerciseMap[exerciseKey],
      index: 0
    })
  }

  renderSelect=(exerciseKey)=>{
    return (
      <Select
      labelId=""
      id="demo-simple-select"
      value={exerciseKey}
      onChange={this.handleChangeExercise.bind(this)}
    >
      <MenuItem value={"descend"}>Descend</MenuItem>
      <MenuItem value={"scales"}>Scales</MenuItem>
    </Select>
    );
  }

  render(){
    const exerciseLabel = this.state.exercise[this.state.index].join(",");
    return (
      <div className="App">
        {this.renderSelect(this.state.exerciseKey)}
        <h2>{exerciseLabel}</h2>
        <button onClick={this.handleClickPrev.bind(this)}>Prev</button>
        <button onClick={this.handleClickPlay.bind(this)}>Play</button>
        <button onClick={this.handleClickFirstNote.bind(this)}>First Note</button>
        <button onClick={this.handleClickNext.bind(this)}>Next</button>
      </div>
    );
  }
}

export default App;
