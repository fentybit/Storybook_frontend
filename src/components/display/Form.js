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
        if (this.state.category) {
            fetch('http://localhost:3000/api/v1/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${this.props.token}`
                },
                body: JSON.stringify({
                    category: this.state.category,
                    vibe: this.state.vibe,
                    title: this.state.title,
                    date: this.state.date,
                    time: this.state.time,
                    location: this.state.location,
                    description: this.state.description
                })
            })
                .then(resp => resp.json())
                .then(data => console.log(data))
        } else {
            event.preventDefault();
        }
    }

    render() {

        return (
            <div>
                <h5>New Entry Form</h5>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='category'>Category</label>
                    <input type='text' name='category' placeholder='New Category' onChange={this.handleOnChange} value={this.state.category} /><br />

                    <label htmlFor='vibe'>Vibe</label>
                    <select name='vibe' id='vibe' onChange={this.handleOnChange}>
                        <option value='' selected disabled hidden>select mood</option>
                        <option value='1 rad'>😀 rad</option>
                        <option value='2 good'>😊 good</option>
                        <option value='3 meh'>😕 meh</option>
                        <option value='4 bad'>😞 bad</option>
                        <option value='5 awful'>😩 awful</option>
                    </select><br />

                    <label htmlFor='title'>Event</label>
                    <input type='text' name='title' placeholder='Event Title' onChange={this.handleOnChange} value={this.state.title} /><br />

                    <label htmlFor='date'>Date</label>
                    <input type='date' name='date' placeholder='Event Date' onChange={this.handleOnChange} value={this.state.date} /><br />

                    <label htmlFor='time'>Time</label>
                    <input type='time' name='time' placeholder='Event Time' onChange={this.handleOnChange} value={this.state.time} /><br />

                    <label htmlFor='location'>Location</label>
                    <input type='location' name='location' placeholder='Enter Location' onChange={this.handleOnChange} value={this.state.location} /><br />

                    <label htmlFor='description'>Description</label>
                    <textarea name='description' placeholder='Event Description' onChange={this.handleOnChange} value={this.state.description} /><br />

                    <input type='submit' value='Save' />
                </form>
            </div>
        )
    }
}