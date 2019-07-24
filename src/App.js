import React from 'react';
import './App.css';
import Student from './student';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      rawData: [],
      searchQuery: ""
    };

    this.fetchRawData = this.fetchRawData.bind(this);
    this.handleInput = this.handleInput.bind(this);

  }

  componentDidMount(){
   this.fetchRawData();
  }

  fetchRawData(){
    fetch('https://www.hatchways.io/api/assessment/students')
      .then(res => res.json())
      .then(data => this.setState({ rawData: data }));
  }

  handleInput(e){
    this.setState({searchQuery: e.currentTarget.value});
  }

  render() {

    if (!this.state.rawData.students) return null;

    return (
      <div className="App">

        <div className="student-index">
          <div className="name-filter">
              <input type="text" className="search-field" onChange={this.handleInput}/>
          </div>

          {this.state.rawData.students.map(student => {
            return(
              <Student student={student} key={student.id}/>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
