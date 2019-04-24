import React from 'react'
import './post.scss'

class Post extends React.Component {
    state = {
        post: {
            title: this.props.post.title,
            contents: this.props.post.contents
        },
        editing: false
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            post: {
                ...this.state.post,
                [e.target.name]: e.target.value
            }
        })
    }

    editPost = () => {
        this.props.editPost(this.state.post, this.props.post.id)
        this.setState({
            ...this.state,
            editing: false
        })
    }

    render() {
        return (
            <div className='post'>
                <button
                    onClick={() => {
                        this.setState({
                            ...this.state,
                            editing: true
                        })
                    }}
                    style={{
                        display: this.state.editing ?
                            'none' : 'block'
                    }}
                >Edit Post</button>
                <p>Quote: {this.state.editing ?
                    <input
                        name='title'
                        onChange={this.handleChanges}
                        value={this.state.post.title}
                    /> :
                    this.props.post.title
                }</p>
                <p>Character: {this.state.editing ?
                    <input
                        name='contents'
                        onChange={this.handleChanges}
                        value={this.state.post.contents}
                    /> :
                    this.props.post.contents
                }</p>
                <button
                    style={{
                        display: this.state.editing ?
                            'none' : 'block'
                    }}
                    onClick={() => this.props.delPost(this.props.post.id)}
                >Delete</button>
                <button
                    style={{
                        display: !this.state.editing ?
                            'none' : 'block'
                    }}
                    onClick={() => this.editPost()}
                >Submit</button>
            </div>
        )
    }
}

export default Post
