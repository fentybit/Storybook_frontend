import React, { Component } from 'react'

class DisplayList extends Component {
    render() {
        return (
            <div>
                {console.log(this.props.user.name)}
            </div>
        )
    }
}

export default DisplayList;