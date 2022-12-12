// https://www.pluralsight.com/guides/how-to-communicate-between-independent-components-in-reactjs

import React from "react";
import eventBus from "../Events/EventBus";
import {EVENT_FILE_CHOSEN, EVENT_MIC_CHOSEN} from "../Events/EventList";
import Plot from 'react-plotly.js';
import AudioAnalyzerApp from "./AudioAnalyzerApp"

class Waveform extends React.Component{
    constructor(props){
        super(props);
        this.state={
            file:"",
            
        }

       
    }

    //Listen for events on mount and do corresponding actions
    componentDidMount(){
        eventBus.on(EVENT_FILE_CHOSEN,(data)=>{
            console.log("Waveform EVENT_FILE_CHOSEN; ","",data)
            this.setState({file:data.file});
            
        })
       
    }

    //unregister events during unmount
    componentWillUnmount() {

        eventBus.remove(EVENT_FILE_CHOSEN);
        
    
    }
    
    // toggleMicrophone() {
    //     this.setState({isMicrophone:!this.state.isMicrophone});
    // }
    
      render() {
    
        return (<div>
             <p>"Waveform states: file: "{this.state.file}</p> 
            <AudioAnalyzerApp  audio={this.state.file} />
            
        </div>);
    
      }
}

export default Waveform;