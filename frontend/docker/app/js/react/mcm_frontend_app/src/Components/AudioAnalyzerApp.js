import React, { Component } from 'react';
import AudioAnalyzer from './AudioAnalyzer';
import eventBus from '../Events/EventBus'
import {EVENT_FILE_CHOSEN,EVENT_MIC_CHOSEN} from '../Events/EventList'

class AudioAnalyzerApp extends Component {
  constructor(props) {
    super(props);
    console.log("AudioAnalyzerApp: " ,props)
    this.state = {
      audio: props.audio,
      isMicrophone: false
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }

  componentDidMount(){
    eventBus.on(EVENT_MIC_CHOSEN,(data)=>{
      console.log("EVENT_MIC_CHOSEN; ","",data)
      this.setState({file:null});
      this.setState({isMicrophone:true})
  });

  eventBus.on(EVENT_FILE_CHOSEN,(data)=>{
    console.log("EVENT_FILE_CHOSEN; ","",data)
    // if(this.state.isMicrophone){
    //   this.stopMicrophone();
    // }
    
    this.setState({audio:data.audio});
    // this.setState({isMicrophone:false})
});
  }

  componentWillUnmount(){
    eventBus.remove(EVENT_MIC_CHOSEN)
    eventBus.remove(EVENT_FILE_CHOSEN)
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio:audio });
    this.setState({ isMicrophone:true});
    eventBus.dispatch(EVENT_MIC_CHOSEN, {isMicrophone:true})
  }

  stopMicrophone() {
    // if(this.state.audio!=undefined & this.state.audio!=null){
      this.state.audio.getTracks().forEach(track => track.stop());
    // }
    
    this.setState({ audio: null });
    this.setState({isMicrophone: false})

  }

  toggleMicrophone() {
    if (this.state.isMicrophone) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  render() {
    return (
      <div className="AudioAnalyzerApp">
        <div className="controls">
          <button onClick={this.toggleMicrophone}>
            {this.state.isMicrophone ? 'Stop microphone' : 'Get microphone input'}
          </button>
        </div>
        
        {this.state.isMicrophone ? <AudioAnalyzer audio={this.state.audio} /> : ''}
      </div>
    );
  }
}

export default AudioAnalyzerApp;
