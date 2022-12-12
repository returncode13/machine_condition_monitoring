import React, { Component } from 'react';
import eventBus from '../Events/EventBus';
import { EVENT_FILE_CHOSEN, EVENT_MIC_CHOSEN } from '../Events/EventList';
import AudioVisualizer from './AudioVisualizer';
import soundfile from './forwhomTBT.mp3'
import {DATA_URL} from '../Appwide/sources'
class AudioAnalyzer extends Component {
  constructor(props) {
    
    super(props);
    console.log("AudioAnalyzer: props: ",props )
    this.state = { audioData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    
      this.source = this.audioContext.createMediaStreamSource(this.props.audio)
      this.source.connect(this.analyser);

    // eventBus.on(EVENT_FILE_CHOSEN,(data)=>{
    //   console.log("AudioAnalyzer EVENT_FILE_CHOSEN file chosen: "+data.file)
    //   let url=(DATA_URL+data.file);
    //   console.log("AudioAnalyzer EVENT_FILE_CHOSEN file chosen: Document.location.origin: "+url)
    //   this.audiofile=new Audio(url)
    //   this.audiofile.crossOrigin="anonymous"  //https://stackoverflow.com/questions/59016637/the-htmlmediaelement-passed-to-createmediaelementsource-has-a-cross-origin-resou
    //   this.analyser = this.audioContext.createAnalyser();
    //   this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    //   this.source = this.audioContext.createMediaElementSource(this.audiofile)  //Test
    //   this.source.connect(this.analyser); //Test
    //   }
    // );

    // eventBus.on(EVENT_MIC_CHOSEN,()=>{
    //   console.log("AudioAnalyzer EVENT_MIC_CHOSEN Mic chosen")
    //   // this.source = this.audioContext.createMediaStreamSource(this.props.audio) //Test
    // });

    
    // this.source.connect(this.analyser); //Test
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
   
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
    // console.log("AudioAnalyzerApp: tick() ", this.dataArray)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
    // eventBus.remove(EVENT_FILE_CHOSEN);
    // eventBus.remove(EVENT_MIC_CHOSEN);
  }

  render() {
    return <AudioVisualizer audioData={this.state.audioData} />;
  }
}

export default AudioAnalyzer;
