// https://dobrian.github.io/cmp/topics/sample-recording-and-playback-with-web-audio-api/1.loading-and-playing-sound-files.html

import React from 'react';
import ReactDOM from 'react-dom/client';

import logo from './logo.svg';
import './App.css';
import mfile from './forwhomTBT.mp3'
class App extends React.Component{
  constructor(props){
    super(props);
    this.handleplay=this.handleplay.bind(this)
  }

  componentDidMount(){
    this.audioCtx=new AudioContext();
    this.audiof=new Audio(mfile);
    this.source=this.audioCtx.createMediaElementSource(this.audiof)
    this.source.connect(this.audioCtx.destination); 
  }
  
  handleplay(){
    console.log(this.audiof);
    this.audiof.play()}
  
  render(){
    return (
      <div className="App">
        <p>{"Something"}</p>
        <button onClick={this.handleplay}>

        </button>
      </div>
    );
    };
  }
export default App;
