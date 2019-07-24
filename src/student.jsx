import React from 'react';

class Student extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      average: null,
      collapsed: true,
      tag: "",
      tags: []
    };

    this.getAverage = this.getAverage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchTags = this.fetchTags.bind(this);

  }

  componentDidMount(){
    this.setState({ average: this.getAverage() + "%"});
    this.fetchTags();
  }

  getAverage(){
    let grades = this.props.student.grades;
    let sum = 0;

    for (let i = 0; i < grades.length; i++){
      sum += parseInt(grades[i]);
    }

    return sum / grades.length;
  }

  handleClick(){
    this.setState({collapsed: !this.state.collapsed});
  }

  handleInput(e){
    this.setState({tag: e.currentTarget.value});
  }

  handleSubmit(e){
    e.preventDefault();
    let tag = this.state.tag;
    let name = `tags${this.props.student.id}`;
    if (!sessionStorage.getItem(name)) sessionStorage.setItem(name, "");
    if (sessionStorage.getItem(name) === ""){
      sessionStorage.setItem(name, sessionStorage.getItem(name).concat(`${tag}`));
    } else{
      sessionStorage.setItem(name, sessionStorage.getItem(name).concat(` ${tag}`));
    } 
    console.log(document.querySelectorAll(".tag-field"));
    document.querySelectorAll(".tag-field").forEach(el => {
      return el.value = "";
    });
    this.fetchTags();
  }

  fetchTags(){
    let name = `tags${this.props.student.id}`;
    let tagString;
    if (sessionStorage.getItem(name) === null){
      tagString = "";
    } else{
      tagString = sessionStorage.getItem(name).trim();
    }
    let tags = tagString.split(" ");
    if (tags[0] === "") tags = [];
    this.setState({tags: tags});
  }

  render(){
    let expand = (
      <button onClick={this.handleClick} className="button">
        +
      </button>
    )

    let collapse = (
      <button onClick={this.handleClick} className="button">
        -
      </button>
    )

    let scores = (
      <div className="scores">
        {this.props.student.grades.map((grade, i) => {
          return (
            <li className="grades" key={i}>
              <div className="test-score">
                <div>Test {i + 1}:</div>
                 <div className="grade">{grade}%</div>
              </div>
            </li>
          )
        })}

        <div className="tags">
          {this.state.tags.map(tag => {
            return(
              <div className="tag">
                {tag}
              </div>
            )
          })}
        </div>

        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleInput} className="tag-field" placeholder="Add a tag"/>
        </form>

      </div>
    )


    return(

      <li className="student" key={this.props.student.id}> 
          <img src={this.props.student.pic} alt="pic" className="pic" />
          <div className="student-info">
            <div className="top">
              <h3 className="name">
              {this.props.student.firstName.toUpperCase()} {this.props.student.lastName.toUpperCase()}
              </h3>
              {this.state.collapsed && expand}
              {!this.state.collapsed && collapse}
            </div>
            <div className="info">
              <div className="info-line">Email: {this.props.student.email}</div>
              <div className="info-line">Company: {this.props.student.company}</div>
              <div className="info-line">Skill: {this.props.student.skill}</div>
              <div className="info-line">Average: {this.state.average}</div>

              {!this.state.collapsed && scores}
              
            </div>
          </div>
          
      </li>
    )
  }
}

export default Student;