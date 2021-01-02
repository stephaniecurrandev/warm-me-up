import React from 'react';
import _ from 'lodash';
import {getWarmup, playExercise} from "./toneUtils";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './App.css';

const DEFAULT_STARTER_KEY = 6;

const scales = getWarmup([0,2,4,7,4,2,0]);
const descend = getWarmup([4,3,2,1,0])
const octaves = getWarmup([0,7,0]);

const exerciseMap = {scales, descend, octaves};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: DEFAULT_STARTER_KEY,
      exerciseKey: "descend",
      exercise: descend,
      playTransition: false,
      autoPlay: false,
      noAccidentals: false
    };
  }

  handleClickPlay= ()=> {
    const length = this.state.exerciseKey === "octaves"? 1.5 : .5;
    let toPlayEx = this.state.exercise[this.state.index];
    if(this.state.playTransition && this.state.index+1 < this.state.exercise.length) {
      const twoNotes = [
        this.state.exercise[this.state.index][0],
        this.state.exercise[this.state.index+1][0],
      ]
      toPlayEx = toPlayEx.concat(twoNotes);
    }
    playExercise(toPlayEx,length);
    if(this.state.autoPlay) {
      setTimeout(()=> this.handleClickNext(this.handleClickPlay),5000);
    }
  }

  handleClickPrev= ()=>{
    let next = this.state.index - 1;
    if(next < 0) next = 0;
    this.setState({index: next});
  }

  handleClickNext= ()=> {
    let next = this.state.index + 1;
    let potentialKey = _.last(this.state.exercise[next],"");
    const isHalfStep = _.includes(potentialKey,"b") ||_.includes(potentialKey,"#") ;
    const callback = this.state.noAccidentals && isHalfStep? 
                     this.handleClickNext : 
                     this.state.autoPlay ? 
                     this.handleClickPlay : null;
    
    if(next >= this.state.exercise.length) next = this.state.exercise.length - 1;

    this.setState({index: next}, callback);
  }
  
  handleClickFirstNote= ()=> {
    playExercise([this.state.exercise[this.state.index][0]])
  }

  handleChangeExercise= (e)=> {
    const exerciseKey = e.target.value;
    this.setState({
      exerciseKey,
      exercise: exerciseMap[exerciseKey],
      index: DEFAULT_STARTER_KEY
    })
  }

  handleAutoplayCheckChange = (e) => {
    const status = e.target.checked;
    this.setState({
      autoPlay: status
    });
  }

  handleTransitionCheckChange = (e) => {
    const status = e.target.checked;
    this.setState({
      playTransition: status
    });
  }

  handleAccidentalCheckChange = (e) => {
    const status = e.target.checked;
    this.setState({
      noAccidentals: status
    });
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
      <MenuItem value={"octaves"}>Octaves</MenuItem>
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
        <div>
          <input type="checkbox" 
          checked={this.state.autoPlay} 
          onClick={this.handleAutoplayCheckChange.bind(this)}/>
          {" Autoplay"}
        </div>
        <div>
          <input type="checkbox" 
          checked={this.state.playTransition} 
          onClick={this.handleTransitionCheckChange.bind(this)}/>
          {" Play Transition"}
        </div>
        <div>
          <input type="checkbox" 
          checked={this.state.noAccidentals} 
          onClick={this.handleAccidentalCheckChange.bind(this)}/>
          {" No accidentals on the way up"}
        </div>
      </div>
    );
  }
}

export default App;
