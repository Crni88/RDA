import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileActions';
 class Education extends Component {
     onDeleteClick(id){
         this.props.deleteEducation(id);
     }
    render() {
        const education = this.props.education.map(
            edu =>(
                <tr key={edu.id}>
                    <td>{edu.school}</td>
                    <td>{edu.degree}</td>
            <td><Moment format="DD/MM/YYYY">{edu.from}</Moment> - {edu.to === null ? (' Now'): (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}
            
            </td>
            <td><button onClick={this.onDeleteClick.bind(this,edu._id)} className="btn btn-danger">Delete</button></td>
                </tr>
            )
        )
        return (
            <div >
                <h4 className="mb-2">Education Credentials</h4>
                <table className="table">
                    <thead>
                       <tr>
                           <th>
                               School
                           </th>
                           <th>degree</th>
                           <th>Years</th>
                           <th></th>
                       </tr> 
                           {education}
                    </thead>
                </table>
            </div>
        )
    }
}
Education.propTyper={
    deleteEducation:PropTypes.func.isRequired
}
export default connect(null,{deleteEducation})(Education);