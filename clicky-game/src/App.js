import React, { Component } from 'react';
import './App.css';

import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";

import images from "./cards.json";
import "./App.css";

class App extends Component {
  state = {
    images,
    imageIds: [],
    status: "",
    score: 0,
    goal: 10,
    
  };


  scoreCard = id => {
    let imageIds = this.state.imageIds;

    if (imageIds.includes(id)) {
      this.setState({ imageIds: [], score: 0, status: "You Lost! Click an Image to play again!" });
      return;
    } else {
      imageIds.push(id)

      if (imageIds.length === 8) {
        this.setState({ score: 8, status: "You Won! Play again!", imageIds: [] });
        console.log('Ya Win');
        return;
      }

      this.setState({ images, imageIds, score: imageIds.length, status: " " });

      for (let i = images.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
      }
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky Game A React App</h1>
          <p className="App-intro">
            Don't Click The Same Image Twice!
          </p>
          <Score total={this.state.score}
            goal={10}
            status={this.state.status}
          />
        </header>
        <Score total={this.state.score}
          goal={10}
          status={this.state.status}
        />
        <Wrapper>
          {this.state.images.map(meme => (
            <Card
              scoreCard={this.scoreCard}
              id={meme.id}
              key={meme.id}
              image={meme.image}
            />
          ))}
        </Wrapper>
        <footer>
          <p>More
         <a href="https://github.com/aprilmd97/Clicky-React-" target="_blank" rel="noopener noreferrer"> here</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
