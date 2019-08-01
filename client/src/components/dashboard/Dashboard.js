import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listuser, logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const user = {

    };
    this.state = {
      user_list : [],
      commits: [],
      real_commits : [],
    };
    listuser(user).then(data =>{
      if(data){
        this.setState({user_list:data.data})
      }
    },
      () => {
    });

    }
  async componentDidMount() {
    const url = "https://api.github.com/repos/angular/angular/commits";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({commits : data,real_commits : data});
  };

  Data_Search = e => {
    let data = Object.assign({}, this.state.real_commits);
    let dataFiltered = Object.values(data).filter(person => person.commit.author.name.match(new RegExp(e.target.value, 'i')));
    this.setState({ commits:dataFiltered });
    e.preventDefault();
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    console.log(this. state.user_list);
    const peopleJsx = [];
    this.state.commits.forEach((person,i) => {
      peopleJsx.push(
        <div key={person.node_id}>
          <div  className = 'col s9' style = {{border:'2px #35629a solid',padding:'2%',margin:'1%'}}>
            <div>
              <div className='col s2'>
                <img width='100%' height='100%' src={person.author.avatar_url} id = 'search' name='search'></img>
              </div>
              <div className='col s9'>
                <p>
                  sha : {person.sha}
                </p>
                <p>
                  Author : {person.commit.author.name}
                </p>  
              </div>
            </div>
            <div className='col s9'>
              <div className='col s2'> Message:</div>
              <div className='col s10'>  {person.commit.message} </div>
            </div>
            <div className='col s7'>
              Date : {person.commit.author.date}
            </div>
          </div>
        </div>
      )
    })
    // console.log(this.state.commits.map);
    return (
      <div className="row" style={{ height: "20vh" }} >
        <div>
          <div className="landing-copy col s10 left-align">
            <h4>
              <b>Dashboard</b>
             
            </h4>
          </div>
          <div className="landing-copy col s2 left-align" >
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
          <div className='col s6 center-align'>
            <input type='text' placeholder='Search.........' className='s-input s-input__search js-search-field' onChange = {this.Data_Search} id = 'search' name='search'></input>
          </div>
          <div className='col s2'></div>
          <br />
        <div >
          <div className='col s1'></div>
          <div className='col s7 left-align' style={{padding:'1%'}}>
            {peopleJsx}
          </div>
        </div>
        <div className = 'col s2' style={{border:'2px green solid'}}>
          <u><h5>UserList</h5></u>
          <ul>
            <div>
            {this.state.user_list.map((users, index) => (
                <div key={index}>
                 <a href=''><u><p><li>{users.email}</li></p></u></a>
                </div>
              ))
            }
          </div>
          </ul>
        </div>

      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
