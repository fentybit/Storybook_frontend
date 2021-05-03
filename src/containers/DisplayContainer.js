import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions';
// import DisplayList from '../components/DisplayList';

class DisplayContainer extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    handleLoading = () => {

        if (this.props.loading) {
            return <div>Loading...</div>
        } else {
            return <div>{this.props.user.fullname}</div>
        }
    }

    render() {
        return (
            <div>
                <h3>Display Container</h3>
                {this.handleLoading()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { fetchUser })(DisplayContainer);