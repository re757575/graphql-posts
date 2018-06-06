import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { getPostsQuery } from '../queries';

// https://github.com/iamshaunjp/graphql-playlist/blob/lesson-36/client/src/components/BookList.js
const propTypes = {
  data: PropTypes.object,
};

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  handleClickPost = post => {
    const { onClick } = this.props;
    onClick(post);
  };

  showList() {
    const { data, onClick } = this.props;
    const { posts } = data;

    if (data.loading) {
      return <div>Loading posts...</div>;
    } else {
      return posts.map(post => {
        return (
          <li key={post.id} onClick={e => this.handleClickPost(post)}>
            {post.title} by {post.user.name}
          </li>
        );
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <ul>{this.showList()}</ul>
      </div>
    );
  }
}

PostList.propTypes = propTypes;

export default graphql(getPostsQuery)(PostList);
