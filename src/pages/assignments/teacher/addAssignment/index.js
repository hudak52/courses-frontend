import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavItem, NavLink, Nav, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';

import Info from './0-info';
import Fields from './1-fields';
import PeerReview from './2-peerReview';
import Teams from './3-teams';
import Reviews from './4-reviews';
import TeamReviews from './5-teamReviews';

const defaultForm={
  info:{
    name:'',
    description:'',
    documents:[{id:1,name:'Document 1',url:'https://www.google.com/search?q=semantika'},{id:2,name:'Document 2',url:'https://www.google.com/search?q=matematika'},{id:3,name:'Document 3',url:'https://www.google.com/search?q=logika'}]
  },
  fields:{
    fields:[
      {id:0,title:'Nazov riesenia',description:'Nazvy riesenie',type:{label:'input',value:'input'},isTitle:false},
      {id:1,title:'Popis riesenia',description:'Popis riesenie',type:{label:'text area',value:'text area'},isTitle:false},
    ]
  },
  peerReview:{
    disabled:false,
    anonymousSubmission:false,
    openTime:'',
    deadline:'',
    extraTime:15,
    improvedSubmission:false,
    improvedOpenTime:'',
    improvedDeadline:'',
    improvedExtraTime:15
  },
  teams:{
    disabled:false,
    submittedAsTeam:true,
    minimumInTeam:1,
    maximumInTeam:2,
    multipleSubmissions:false,
  },
  reviews:{
    disabled:false,
    openTime:'',
    deadline:'',
    extraTime:15,
    reviewsPerSubmission:3,
    reviewedByTeam:true,
    visibility:'blind'
  },
  teamReviews:{
    disabled:false,
    openTime:'',
    deadline:'',
    extraTime:15,
    questions:[
      {id:1,name:'Question 1'},
      {id:2,name:'Question 2'},
      {id:3,name:'Question 3'}
    ]
  }
}

export default class ModalAdd extends Component {
  constructor(props){
    super(props);
    this.state={
      activeTab:'1',
      opened:false,
      showErrors:false,
      ...defaultForm,
    }
    this.toggle.bind(this);
    this.canSave.bind(this);
    this.infoOK.bind(this);
    this.peerReviewOK.bind(this);
    this.teamsOK.bind(this);
    this.reviewsOK.bind(this);
    this.teamReviewsOK.bind(this);
  }

  toggle(){
    this.setState({opened:!this.state.opened})
  }

  setDefaults(){
    if(window.confirm('Are you sure you want to reset all assignment settings?')){
      this.setState(defaultForm);
    }
  }

  canSave(){
    return this.infoOK(this.state.info) &&
      this.fieldsOK(this.state.fields) &&
      this.peerReviewOK(this.state.peerReview) &&
      this.teamsOK(this.state.teams) &&
      this.reviewsOK(this.state.reviews) &&
      this.teamReviewsOK(this.state.teams, this.state.teamReviews)
  }

  infoOK(info){
    return info.name.length>4
  }

  fieldsOK(fields){
    return fields.fields.length>0
  }

  peerReviewOK(peerReview){
    //openTime a iimrpoovedOpenTime su nezavysle
    let openTime = moment(peerReview.openTime).unix();
    let deadline = moment(peerReview.deadline).unix();
    let improvedOpenTime = moment(peerReview.improvedOpenTime).unix();
    let improvedDeadline = moment(peerReview.improvedDeadline).unix();
    return peerReview.disabled || (
      !isNaN(openTime) &&
      !isNaN(deadline) &&
      openTime <= deadline &&
      !isNaN(parseInt(peerReview.extraTime)) &&
      parseInt(peerReview.extraTime)>=0 &&
      (!peerReview.improvedSubmission||(
        !isNaN(improvedOpenTime) &&
        !isNaN(improvedDeadline) &&
        improvedOpenTime <= improvedDeadline &&
        !isNaN(parseInt(peerReview.improvedExtraTime)) &&
        parseInt(peerReview.improvedExtraTime)>=0
      ))
    )
  }

  teamsOK(teams){
    return teams.disabled||(
      !isNaN(parseInt(teams.minimumInTeam)) &&
      !isNaN(parseInt(teams.maximumInTeam)) &&
      parseInt(teams.minimumInTeam) <= parseInt(teams.maximumInTeam) &&
      parseInt(teams.minimumInTeam) >= 2
    )
  }

  reviewsOK(reviews){
    let openTime = moment(reviews.openTime).unix();
    let deadline = moment(reviews.deadline).unix();
    return reviews.disabled||(
      !isNaN(openTime) &&
      !isNaN(deadline) &&
      openTime <= deadline &&
      parseInt(reviews.extraTime)>=0&&
      parseInt(reviews.reviewsPerSubmission)>=1
    );
  }

  teamReviewsOK(teams,teamReviews){
    let openTime = moment(teamReviews.openTime).unix();
    let deadline = moment(teamReviews.deadline).unix();
    return teams.disabled||teamReviews.disabled||(
      !isNaN(openTime) &&
      !isNaN(deadline) &&
      openTime <= deadline &&
      parseInt(teamReviews.extraTime) >=0
    );
  }

  submitAssignment(){
    this.toggle();
    this.setState(defaultForm);
  }

  render(){
    return(
      <div>
        <Button color="primary" onClick={this.toggle.bind(this)}>Add assignment</Button>
        <Modal isOpen={this.state.opened} className={this.props.className} style={{width:'auto',maxWidth:1000}}>
          <ModalHeader toggle={this.toggle.bind(this)}>
            Adding new assignment
          </ModalHeader>
          <ModalBody>
            <Nav tabs className="b-0">
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1',hasError:!this.infoOK(this.state.info)}, "clickable")}
                  onClick={() => { this.setState({activeTab:'1'}) }}
                >
                  Info
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2',hasError:!this.fieldsOK(this.state.fields)}, "clickable")}
                  onClick={() => { this.setState({activeTab:'2'}) }}
                >
                  Fields
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3',hasError:!this.peerReviewOK(this.state.peerReview)}, "clickable")}
                  onClick={() => { this.setState({activeTab:'3'}) }}
                >
                  Peer Review
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4',hasError:!this.teamsOK(this.state.teams)}, "clickable")}
                  onClick={() => { this.setState({activeTab:'4'}) }}
                >
                  Teams
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '5',hasError:!this.reviewsOK(this.state.reviews)}, "clickable")}
                  onClick={() => { this.setState({activeTab:'5'}) }}
                >
                  Reviews
                </NavLink>
              </NavItem>
              {
                !this.state.teams.disabled && <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '6',hasError:!this.teamReviewsOK(this.state.teams,this.state.teamReviews)}, "clickable")}
                  onClick={() => { this.setState({activeTab:'6'}) }}
                >
                  Team Reviews
                </NavLink>
              </NavItem>
            }
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Info data={this.state.info} showErrors={this.state.showErrors} setData={(info)=>{this.setState({info})}} />
              </TabPane>
              <TabPane tabId="2">
                <Fields data={this.state.fields} showErrors={this.state.showErrors} setData={(fields)=>{this.setState({fields})}} />
              </TabPane>
              <TabPane tabId="3">
                <PeerReview data={this.state.peerReview} showErrors={this.state.showErrors} setData={(peerReview)=>{this.setState({peerReview})}} />
              </TabPane>
              <TabPane tabId="4">
                <Teams data={this.state.teams} showErrors={this.state.showErrors} setData={(teams)=>{this.setState({teams})}} />
              </TabPane>
              <TabPane tabId="5">
                <Reviews data={this.state.reviews} showErrors={this.state.showErrors} setData={(reviews)=>{this.setState({reviews})}}/>
              </TabPane>
              <TabPane tabId="6">
                <TeamReviews data={this.state.teamReviews} showErrors={this.state.showErrors} setData={(teamReviews)=>{this.setState({teamReviews})}}/>
              </TabPane>
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <span className="mr-auto">
              <Button outline color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
            </span>
            <span>
              {!this.canSave() && <Button color="link" className={classnames({ "red-text":!this.state.showErrors,"grey-text":this.state.showErrors})} onClick={()=>{this.setState({showErrors:!this.state.showErrors})}}><i className="fa fa-info-circle" /> Show errors</Button>}
              <Button color="danger" onClick={this.setDefaults.bind(this)}>Reset</Button>{' '}
              <Button color="primary" disabled={this.state.activeTab==="1"} onClick={()=>this.setState({activeTab:(parseInt(this.state.activeTab)-1)+""})}>Prev</Button>{' '}
              <Button color="primary" disabled={this.state.activeTab==="6"} onClick={()=>{ this.setState({activeTab:(parseInt(this.state.activeTab)+1)+""});}}>Next</Button>{' '}
              <Button color="success" disabled={!this.canSave()} onClick={this.submitAssignment.bind(this)}>Add assignment</Button>
            </span>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
