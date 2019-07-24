import React from 'react';
import './App.css';
import Student from './student';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      rawData: [],
      filteredData: [],
      filtered: false,
      searchQuery: ""
    };

    this.fetchRawData = this.fetchRawData.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleTagInput = this.handleTagInput.bind(this);

  }

  componentDidMount(){
   this.fetchRawData();
  }

  fetchRawData(){
    fetch('https://www.hatchways.io/api/assessment/students')
      .then(res => res.json())
      .then(data => this.setState({ rawData: data.students }));
  }

  handleNameInput(e){
    this.setState({searchQuery: e.currentTarget.value});
    let filteredData = this.state.rawData;
    let searchQuery = e.currentTarget.value.toLowerCase();
    filteredData = filteredData.filter(student => {
      let fullName = student.firstName.toLowerCase() + student.lastName.toLowerCase();
      return(
        fullName.indexOf(searchQuery) !== -1
      );
    });
    this.setState({filteredData: filteredData, filtered: true});
  }

  handleTagInput(e){
    this.setState({searchQuery: e.currentTarget.value});
    let filteredData = this.state.rawData;
    let tagQuery = e.currentTarget.value.toLowerCase();
    filteredData = filteredData.filter(student => {
      let name = `tags${student.id}`;
      let tags = sessionStorage.getItem(name);
      if (tags === null) tags = "";
      return(
        tags.indexOf(tagQuery) !== -1
      );
    });
    this.setState({filteredData: filteredData, filtered: true});
  }

  render() {

    return (
      <div className="App">

        <div className="student-index">
          <div className="name-filter">
              <input type="text" placeholder="Search by name" className="search-field" onChange={this.handleNameInput} />
          </div>

          <div className="name-filter">
            <input type="text" placeholder="Search by tags" className="search-field" onChange={this.handleTagInput} />
          </div>

          {!this.state.filtered && this.state.rawData.map(student => {
            return(
              <Student student={student} key={student.id}/>
            )
          })}
          {this.state.filtered && this.state.filteredData.map(student => {
            return (
              <Student student={student} key={student.id} />
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
