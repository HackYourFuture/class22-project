import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import Moment from "react-moment";
import Spinner from "../layout/Spinner";

const WaitingItem = ({ auth: { user, loading } }) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    user.sentRequest.map(req => (
      <div className='profile bg-light' key={req._id}>
        <img src={req.avatar} alt='' className='round-img' />
        <div>
          <h2>{req.username}</h2>

          <Link to={`/profile/${req.userId}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>
        <ul>
          <li className='text-primary'>
            <button className='hide-sm btn btn-dark'>Request Sent</button>
          </li>
          <li>
            at: {"   "}
            <Moment format='YYYY/MM/DD'>{moment.utc(req.date)}</Moment>
          </li>
        </ul>
      </div>
    ))
  );
};

WaitingItem.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(WaitingItem);
