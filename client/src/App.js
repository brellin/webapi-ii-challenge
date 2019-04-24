import React from 'react';
import Post from './Post'
import NewPost from './NewPost'
import axios from 'axios'
import './App.scss';

class App extends React.Component {
  state = {
    posts: [],
    error: '',
    newPost: false
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/posts')
      .then(res => {
        this.setState({
          ...this.state,
          posts: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  addPost = post => {
    axios
      .post('http://localhost:5000/api/posts', post)
      .then(res => {
        console.log(res)
        this.setState({
          ...this.state,
          posts: [...this.state.posts, res.data]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  editPost = (postSub, id) => {
    axios
      .put(`http://localhost:5000/api/posts/${id}`, postSub)
      .then(res => {
        this.setState({
          ...this.state,
          posts: this.state.posts.map(post => {
            if (post.id === id) {
              post.title = postSub.title;
              post.contents = postSub.contents;
            }
            return post
          })
        })
      })
      .catch(err => console.log(err))
  }

  delPost = id => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        this.setState({
          posts: this.state.posts.filter(post => post.id !== id)
        })
      })
      .catch(err => console.log(err))
  }

  newPost = () => {
    this.setState({ newPost: !this.state.newPost })
  }

  render() {
    console.log(this.state.posts)
    return (
      <div className="App">
        <header className="App-header">
          <h1>Posts</h1>
        </header>

        <section>
          {!this.state.newPost ?
            this.state.posts.map((post, id) => (
              <Post post={post} editPost={this.editPost} delPost={this.delPost} key={id} />
            )) :
            <NewPost newPost={this.newPost} addPost={this.addPost} />
          }
          <button
            onClick={() => this.newPost()}
            style={{
              display: this.state.newPost ?
                'none' : 'block'
            }}
          >New Post</button>
        </section>

        <footer>
          I only put this here because I wanted some space at the bottom.
        </footer>
      </div>
    );
  }
}

export default App;
