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

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('HERE')
    }

    render() {
        return (
            <div>
                <h5>New Entry Form</h5>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='category'>Category</label>
                    <input type='text' name='category' placeholder='Enter Category' onChange={this.handleOnChange} value={this.state.category} /><br />

                    <label htmlFor='title'>Event</label>
                    <input type='text' name='title' placeholder='Event Title' onChange={this.handleOnChange} value={this.state.title} /><br />

                    <label htmlFor='date'>Date</label>
                    <input type='date' name='date' placeholder='Event Date' onChange={this.handleOnChange} value={this.state.date} /><br />

                    <label htmlFor='time'>Time</label>
                    <input type='time' name='time' placeholder='Event Time' onChange={this.handleOnChange} value={this.state.time} /><br />

                    <label htmlFor='location'>Location</label>
                    <input type='location' name='location' placeholder='Enter Location' onChange={this.handleOnChange} value={this.state.time} /><br />

                    <label htmlFor='description'>Description</label>
                    <input type='textarea' name='description' placeholder='Event Description' onChange={this.handleOnChange} value={this.state.time} /><br />

                    <input type='submit' value='Save' />
                </form>
            </div>
        )
    }
}