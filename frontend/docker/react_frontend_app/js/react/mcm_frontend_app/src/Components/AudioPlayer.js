import React from "react";
import eventBus from "../Events/EventBus";
import {EVENT_FILE_CHOSEN} from "../Events/EventList";
import Plot from 'react-plotly.js';

class AudioPlayer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            file:"",

        }

        
        
    }

    //Listen for events on mount and do corresponding actions
    componentDidMount(){
        eventBus.on(EVENT_FILE_CHOSEN,(data)=>{
            this.setState({file:data.file});
        })
    }

    //unregister events during unmount
    componentWillUnmount(){

        eventBus.remove(EVENT_FILE_CHOSEN);
    
    }
    
    
    render(){
    
        return (
            <div>
                <audio src={this.state.song}>

                </audio>
            </div>
        );
    
    }
    
}

export default AudioPlayer;