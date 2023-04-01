import React, { Component } from 'react';

class FreqVisualizer extends Component {
  constructor(props) {
    super(props);
    console.log("FreqVisualizer: props ",props)
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    
    const sliceWidth = (width * 1.0) / audioData.length;

    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, width, height);

    const barWidth = (width / audioData.length) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < audioData.length; i++) {
        barHeight = audioData[i];

        context.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
        context.fillRect(
          x,
          height - barHeight / 2,
          barWidth,
          barHeight / 2
        );

        x += barWidth + 1;
      }

    // context.lineWidth = 2;
    // context.strokeStyle = '#000000';
    // context.clearRect(0, 0, width, height);

    // context.beginPath();
    // context.moveTo(0, height / 2);
    // for (const item of audioData) {
    //   const y = (item / 255.0) * height;
    //   context.lineTo(x, y);
    //   x += sliceWidth;
    // }
    // context.lineTo(x, height / 2);
    // context.stroke();


  }

  render() {
    return <canvas width="600" height="300" ref={this.canvas} />;
  }
}

export default FreqVisualizer;
