import React, { Component } from 'react';

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

    render() {
        return (
            <div>
                <h5>New Entry Form</h5>
                <form>
                    <input type='text' name='category' placeholder='' />

                </form>
            </div>
        )
    }
}