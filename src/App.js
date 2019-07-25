import React from 'react';
import './App.css';
import Student from './student';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      rawData: [],
      filteredData: [],
      nameFilteredData: [],
      tagFilteredData: [],
      filtered: false,
      nameQuery: "",
      tagQuery: ""
    };
    this.nameFilteredData = [];
    this.tagFilteredData = [];
    this.finalFilteredData = [];
    this.fetchRawData = this.fetchRawData.bind(this);
    // this.handleNameInput = this.handleNameInput.bind(this);
    // this.handleTagInput = this.handleTagInput.bind(this);
    this.handleInput = this.handleInput.bind(this);

  }

  componentDidMount(){
   this.fetchRawData();
  }

  fetchRawData(){
    fetch('https://www.hatchways.io/api/assessment/students')
      .then(res => res.json())
      .then(data => this.setState({ rawData: data.students }));
  }

  handleInput(e){
    if (e.currentTarget.classList[0] === "name-search-field"){
      this.setState({ nameQuery: e.currentTarget.value });
      let nameFilteredData = this.state.rawData;
      let nameQuery = e.currentTarget.value.toLowerCase();
      nameFilteredData = nameFilteredData.filter(student => {
        let fullName = student.firstName.toLowerCase() + student.lastName.toLowerCase();
        return (
          fullName.indexOf(nameQuery) !== -1
        );
      });
      this.nameFilteredData = nameFilteredData;
    }

    if (e.currentTarget.classList[0] === "tag-search-field"){
      this.setState({ tagQuery: e.currentTarget.value });
      let tagFilteredData = this.state.rawData;
      let tagQuery = e.currentTarget.value.toLowerCase();
      tagFilteredData = tagFilteredData.filter(student => {
        let name = `tags${student.id}`;
        let tags = sessionStorage.getItem(name);
        if (tags === null) tags = "";
        return (
          tags.indexOf(tagQuery) !== -1
        );
      });
      this.tagFilteredData = tagFilteredData;
    }

    if (document.getElementById("name-search").value === ""){
      this.finalFilteredData = this.tagFilteredData;
    } else if (document.getElementById("tag-search").value === "") {
      this.finalFilteredData = this.tagFilteredData;
    } else {
      this.finalFilteredData = this.nameFilteredData.filter(value => this.tagFilteredData.includes(value));
    }
    
    this.setState({ filteredData: this.finalFilteredData, filtered: true });
  }


  render() {

    return (
      <div className="App">

        <div className="student-index">
          <div className="name-filter">
              <input type="text" placeholder="Search by name" className="name-search-field" id="name-search" onChange={this.handleInput} />
          </div>

          <div className="name-filter">
            <input type="text" placeholder="Search by tags" className="tag-search-field" id="tag-search" onChange={this.handleInput} />
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
