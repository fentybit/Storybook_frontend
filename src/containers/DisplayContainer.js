import React, { Component } from 'react';
import { fetchUser } from '../redux/actions/userActions';
import { connect } from 'react-redux';
// import DisplayList from '../components/DisplayList';

class DisplayContainer extends Component {
    // componentDidMount() {
    //     this.props.fetchUser();
    // }

    // handleLoading = () => {
    //     if (this.props.user.length === 0) {
    //         return <div>Loading...</div>
    //     } else {
    //         return <div>{this.props.user.fullname}</div>
    //     }
    // }

    render() {
        return (
            <div>
                <h3>Display Container</h3>
                {/* {this.handleLoading()} */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchUser })(DisplayContainer);