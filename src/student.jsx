import React from 'react';

class Student extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      average: null,
      collapsed: true
    };

    this.getAverage = this.getAverage.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount(){
    this.setState({ average: this.getAverage() + "%"}); 
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