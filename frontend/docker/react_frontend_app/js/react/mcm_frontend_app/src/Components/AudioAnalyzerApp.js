import React, { Component } from 'react';
import eventBus from '../Events/EventBus';
import { EVENT_FILE_CHOSEN, EVENT_MIC_CHOSEN } from '../Events/EventList';
import AudioAnalyzer from './AudioAnalyzer';
import soundfile from './forwhomTBT.mp3'

class AudioAnalyzerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }

  async getMicrophone() {
    eventBus.dispatch(EVENT_MIC_CHOSEN,{"message":"mic chosen"})
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  componentDidMount(){
    eventBus.on(EVENT_FILE_CHOSEN,(data)=>{
      console.log("AudioAnalyzerApp: EVENT_FILE_CHOSEN : "+data.file)
      // this.setState({audio:data.file})   //Test
    })
  }

  componentWillUnmount(){
    eventBus.remove(EVENT_FILE_CHOSEN)
  }

  render() {
    return (
      <div className="AudioAnalyzerApp">
        <p>{this.state.audio? "Audio file is "+this.state.audio:"" }</p>
        <div className="controls">
          <button onClick={this.toggleMicrophone}>
            {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
          </button>
        </div>
        <textarea value={this.state.audio} />
        {this.state.audio ? <AudioAnalyzer audio={this.state.audio} /> : ''}
      </div>
    );
  }
}

export default AudioAnalyzerApp;
