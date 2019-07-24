import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      rawData: []
    };
    
  }

  componentDidMount(){
    fetch('https://www.hatchways.io/api/assessment/students')
      .then(res => res.json())
      .then(data => console.log(data)); //log the data;
  }

  render() {
    return (
      <div className="App">
        <h2>StudentDB</h2>

      </div>
    );
  }
}

export default App;
