import React from 'react';

class Student extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      average: null
    };

    this.getAverage = this.getAverage.bind(this);

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


  render(){
    return(
      <li className="student" key={this.props.student.id}> 
          <img src={this.props.student.pic} alt="pic" className="pic" />
          <div className="student-info">
            <h3 className="name">
            {this.props.student.firstName.toUpperCase()} {this.props.student.lastName.toUpperCase()}
            </h3>
            <div className="info">
              <div className="info-line">Email: {this.props.student.email}</div>
              <div className="info-line">Company: {this.props.student.company}</div>
              <div className="info-line">Skill: {this.props.student.skill}</div>
              <div className="info-line">Average: {this.state.average}</div>
            </div>
          </div>
        
          
      </li>
    )
  }
}

export default Student;