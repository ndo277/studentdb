import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      rawData: []
    };

    this.fetchRawData = this.fetchRawData.bind(this);

  }

  componentDidMount(){
   this.fetchRawData();
  }

  fetchRawData(){
    fetch('https://www.hatchways.io/api/assessment/students')
      .then(res => res.json())
      .then(data => this.setState({ rawData: data }));
      // .then(() => console.log(this.state.rawData.students));
  }

  render() {

    if (!this.state.rawData.students) return null;

    return (
      <div className="App">
        <h2>StudentDB</h2>

        <div className="student-index">
          {this.state.rawData.students.map(student => {
            return(
              <li className="student">
                {student.firstName}
              </li>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
