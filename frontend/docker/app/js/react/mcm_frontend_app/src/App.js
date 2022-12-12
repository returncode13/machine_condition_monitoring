import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AudioAnalyzerApp from "./Components/AudioAnalyzerApp";
import AudioDropdown from "./Components/AudioDropdown";
import eventBus from "./Events/EventBus"
import { EVENT_FILE_CHOSEN, EVENT_MIC_CHOSEN } from "./Events/EventList"

class App extends React.Component{

    constructor(props){
        super(props)
        this.state={
            isRealtime:true,
            files:props.files
        }
        
    }

    componentDidMount(){
        eventBus.on(EVENT_FILE_CHOSEN,(data)=>{
            console.log("App EVENT_FILE_CHOSEN: ",data)
            this.setState({isRealtime:false})
        });

        eventBus.on(EVENT_MIC_CHOSEN,(data)=>{
            console.log("App EVENT_MIC_CHOSEN: ",data)
            this.setState({isRealtime:true})
        });
    }

    componentWillUnmount(){
        eventBus.remove(EVENT_FILE_CHOSEN);
        eventBus.remove(EVENT_MIC_CHOSEN);
    }

    
    render(){

        return(
            <div>
                
                <AudioDropdown files={this.state.files} />
                <p>{"App states: isRealtime "+this.state.isRealtime}</p>
                <AudioAnalyzerApp />
            </div>

        );
    };
};

export default App;