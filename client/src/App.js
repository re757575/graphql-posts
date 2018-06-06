import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import PostList from './components/PostList';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      post: {},
    };
  }

  handleClickPost = post => {
    this.setState({
      post,
    });
  };

  render() {
    const showDetail = () => {
      if (this.state.post && this.state.post.id) {
        return <div>{JSON.stringify(this.state.post)}</div>;
      }
    };

    return (
      <ApolloProvider client={client}>
        {/* <div className="App">Hello React</div>; */}
        <PostList onClick={this.handleClickPost} />
        {showDetail()}
      </ApolloProvider>
    );
  }
}

export default App;
