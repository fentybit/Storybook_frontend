import React, { Component } from 'react'
import uuid from 'uuid'; // unique number
// firebase, entire backend by itself

export default class Form extends Component {
    state = {
        category: '',
        title: '',
        date: '',
        time: '',
        location: '',
        vibe: '',
        description: '',
        imageUploads: ''
    }

    // keep the state here, once it's done send it to Redux

    render() {
        return (
            <div>
                <input type='text' name='category' placeholder=''>
            </div>
        )
    }
}