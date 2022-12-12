import React, { startTransition } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import AudioAnalyzerApp from "./Components/AudioAnalyzerApp";
import RTApp  from './Appwide/Realtime/RTApp';
import OfflineApp from './Appwide/Offline/OfflineApp';
import AudioDropdown from './Components/AudioDropdown';
import eventBus from "./Events/EventBus"
import { EVENT_FILE_CHOSEN, EVENT_MIC_CHOSEN } from "./Events/EventList"

class App extends React.Component{

    constructor(props){
        super(props)
        this.state={
            isRealtime:true,
            files:props.files
        }
        this.toggle=this.toggle.bind(this)
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

    toggle(){
        if(this.state.isRealtime){
            this.startOfflineApp();
            
        }else{
            this.startRTApp();
            
        }
    }

    startOfflineApp(){
        this.setState({isRealtime:false});
    }

    startRTApp(){
        this.setState({isRealtime:true})
    }
    
    render(){

        return(
            <div>
                
                <button onClick={this.toggle}>{"Switch"}</button>
                {this.state.isRealtime?<RTApp />:<OfflineApp files={this.state.files}/>}
                
            </div>

        );
    };
};

export default App;