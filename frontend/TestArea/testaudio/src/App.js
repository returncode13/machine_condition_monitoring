// https://dobrian.github.io/cmp/topics/sample-recording-and-playback-with-web-audio-api/1.loading-and-playing-sound-files.html

import React from 'react';
import ReactDOM from 'react-dom/client';

import logo from './logo.svg';
import './App.css';
import AudioVisualizer from './AudioVisualizer';
import FreqVisualizer from './FreqVisualizer';

let datafile="forwhomTBT.mp3"
const DATA_URL="http://0.0.0.0:8000/data/"


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isPlaying:false,
      audioTimeData: new Uint8Array(0),
      audioFreqData:new Uint8Array(0)
    };
   // this.handleplay=this.handleplay.bind(this)
   this.togglePlay=this.togglePlay.bind(this);
   this.tick=this.tick.bind(this)
  }

  componentDidMount(){
    this.audioCtx=new AudioContext();
    let url=(DATA_URL+datafile);
    this.audiof=new Audio(url);
    this.audiof.crossOrigin="anonymous";
    this.source=this.audioCtx.createMediaElementSource(this.audiof)
    this.source.connect(this.audioCtx.destination); 
    this.analyzer=this.audioCtx.createAnalyser();
    this.analyzer.fftSize=256
    this.dataArray = new Uint8Array(this.analyzer.frequencyBinCount);
    this.freqData = new Uint8Array(this.analyzer.frequencyBinCount);
    this.source.connect(this.analyzer)
    this.rafId = requestAnimationFrame(this.tick);
  }

  togglePlay(){
    let tp=this.state.isPlaying;
    if (tp){
      this.stopPlaying()
      tp=false
      
    }else{
      this.startPlaying()
      tp=true
    }
    this.setState({isPlaying:tp})
  }
  
tick(){
    this.analyzer.getByteTimeDomainData(this.dataArray);
    this.analyzer.getByteFrequencyData(this.freqData);
    //console.log(this.dataArray)
    this.setState({ audioTimeData: this.dataArray ,
    audioFreqData:this.freqData});
    this.rafId = requestAnimationFrame(this.tick);
}

  stopPlaying(){
    //https://stackoverflow.com/questions/13110007/web-audio-api-how-to-play-and-stop-audio
    this.audiof.pause();
    this.audiof.currentTime=0;
  }

  startPlaying(){
    this.audiof.play()
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyzer.disconnect();
    this.source.disconnect();
    
  }
  
  render(){
    return (
      <div className="App">
        <p>{"Something"}</p>
        <button onClick={this.togglePlay}>

        </button>
        
        <AudioVisualizer audioData={this.state.audioTimeData}/>
        <FreqVisualizer audioData={this.state.audioFreqData}/>
      </div>
    );
    };
  }
export default App;
