import React, { Component } from 'react'

export default class NewPost extends Component {
    state = {
        title: '',
        contents: ''
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <>
                <input
                    name='title'
                    onChange={this.handleChanges}
                    value={this.state.title}
                />
                <input
                    name='contents'
                    onChange={this.handleChanges}
                    value={this.state.contents}
                />
                <button
                    onClick={() => {
                        this.props.addPost(this.state)
                        this.setState({
                            title: '',
                            contents: ''
                        })
                        this.props.newPost()
                    }}
                >Submit</button>
            </>
        )
    }
}
