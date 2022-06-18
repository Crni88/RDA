import { connect } from 'react-redux';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile} from '../../actions/profileActions';
import {withRouter} from 'react-router-dom';


 class CreateProfile extends Component {
     constructor(props){
         super(props);
        this.state={
            handle:'',
            company:'',
            website:'',
            location:'',
            status:'',
            skills:'',
            githubusername:'',
            bio:'',
            twitter:'',
            facebook:'',
            linkedin:'',
            youtube:'',
            instagram:'',
            errors:{},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     }
     componentWillReceiveProps(nextProps){
         if(nextProps.errors){
             this.setState({errors:nextProps.errors})
         }
     }
     onSubmit(e){
        e.preventDefault();
        const profileData={
            handle:this.state.handle,
            company:this.state.company,
            website:this.state.website,
            location:this.state.location,
            status:this.state.status,
            skills:this.state.skills,
            githubusername:this.state.githubusername,
            bio:this.state.bio,
            twitter:this.state.twitter,
            facebook:this.state.facebook,
            linkedin:this.state.linkedin,
            youtube:this.state.youtube,
            instagram:this.state.instagram,
        }
        this.props.createProfile(profileData,this.props.history.push('/'));
    }
     
     onChange(e){
       this.setState({[e.target.name]:e.target.value});
     }
    render() {
        const {errors,displaySocialInputs} =this.state;
        let socialInputs;
        if(displaySocialInputs){
            socialInputs = (
                <div className="">
                    <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                    >
                    
                    </InputGroup>
                    <InputGroup
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                    >
                    
                    </InputGroup><InputGroup
                    placeholder="Instagram Profile URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                    >
                    </InputGroup>
                    <InputGroup
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                    >
                    </InputGroup>
                    <InputGroup
                    placeholder="Youtube Profile URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                    >
                    </InputGroup>
                   
                </div>
            )
        }
        //Select options for status
        const options =[
            {label:'* Select Professional Status:',value:0},
            {label:'Developer',value:'Developer'},
            {label:'Junior Developer',value:'Junior Developer'},
            {label:'Senior Developer',value:'Senior Developer'},
            {label:'Manager',value:'Manager'},
            {label:'Student',value:'Student'},
            {label:'Instructior or teaching',value:'Instructior or teaching'},
            {label:'Intern',value:'Intern'},
            {label:'Looking for a job',value:'Looking for a job'},
            {label:'CEO',value:'CEO'},

        ];
        return (
            <div className="create-profile">
               <div className="container">
                   <div className="row">
                       <div className="col-md-8 m-auto">
                           <h1 className="display-4 text-center">Create Your Profile</h1>
                           <p className="lead text-cente">
                               Input some info about you and make your profile stand out !
                           </p>
                           <small className="d-block pb-3 text-danger">* = required fields</small>
                           <form onSubmit={this.onSubmit}>
                               <TextFieldGroup 
                               placeholder="* Profile Handle"
                               name="handle"
                               value={this.state.handle}
                               onChange={this.onChange}
                               error={errors.handle} //this.state.errors
                               info="An unique handle for your profile URL. Your full name, company name or nickname. "
                               >
                               </TextFieldGroup>
                               <SelectListGroup 
                               placeholder="Status"
                               name="status"
                               value={this.state.status}
                               onChange={this.onChange}
                               options = {options}
                               error={errors.status} //this.state.errors
                               info="Give us an idea of where are you at in your career."
                               >
                               </SelectListGroup>
                               <TextFieldGroup 
                               placeholder="Company"
                               name="company"
                               value={this.state.company}
                               onChange={this.onChange}
                               error={errors.company} //this.state.errors
                               info="Could be your own company or one you work for."
                               >
                               </TextFieldGroup>
                               <TextFieldGroup 
                               placeholder="Website"
                               name="website"
                               value={this.state.website}
                               onChange={this.onChange}
                               error={errors.website} //this.state.errors
                               info="Can be your own website or a website of your company."
                               >
                               </TextFieldGroup>
                               <TextFieldGroup 
                               placeholder="Location"
                               name="location"
                               value={this.state.location}
                               onChange={this.onChange}
                               error={errors.location} //this.state.errors
                               info="City or city & coutry suggested (eg. Karaula, BiH)"
                               >
                               </TextFieldGroup>
                               <TextFieldGroup 
                               placeholder="* Skills"
                               name="skills"
                               value={this.state.skills}
                               onChange={this.onChange}
                               error={errors.skills} //this.state.errors
                               info="Please use comma separated values (eg. C#,C++,PHP)"
                               >
                               </TextFieldGroup>
                               <TextFieldGroup 
                               placeholder="GitHub Username"
                               name="githubusername"
                               value={this.state.githubusername}
                               onChange={this.onChange}
                               error={errors.githubusername} //this.state.errors
                               info="If you want your latest repos and GitHub link, include your username."
                               >
                               </TextFieldGroup>
            <TextAreaFieldGroup
            placeholder="Short Bio"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
            error = {errors.bio}
            info="Tell us more about yourself"
            >
            </TextAreaFieldGroup>
<div className="mb-3">
    <button 
    type="button"
    onClick={()=>
    this.setState(prevState => ({
        displaySocialInputs:!prevState.displaySocialInputs
    }))//Social media link
    }className="btn btn-light">Add Social Network links</button>
    <span className="text-muted ml-2">Optional</span>
</div>
{socialInputs}
<input type="submit" value="Submit" className="btn btn-info btn-block mt-4"></input>
                           </form>
                       </div>
                   </div>
               </div>
            </div>
        )
    }
}
CreateProfile.propTypes={
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile:state.profile,
    errors:state.errors,

})
export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile));