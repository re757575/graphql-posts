import * as React from 'react';
import { graphql, ChildProps, QueryProps } from 'react-apollo';
import { getPostsQuery } from '../queries';

type User = {
  id: number;
  name: string;
};

type Post = {
  id: number;
  title: string;
  context: string;
  user: User;
};

// graphql
type Response = {
  posts: [Post];
};

type PostListProps = {
  data: { posts: Array<Post>; loading: boolean };
};

type PostListState = {
  selected: Post | null;
};

type WrappedProps = Response & QueryProps & PostListProps;

type InputProps = {
  id: number
};

const withPostList = graphql<Response, InputProps, WrappedProps>(getPostsQuery, {
  options: () => ({
    // variables: { episode: 'JEDI' },
  }),
});

// class PostList extends React.Component<PostListProps, PostListState> {
class PostList extends React.Component<
  ChildProps<Response, InputProps, WrappedProps>,
  PostListState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  handleClickPost = (post: Post): void => {
    this.setState({
      selected: post,
    });
  };

  showList(): React.ReactNode {
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading posts...</div>;
    } else {
      const { posts } = data;
      console.log(posts);
      return posts.map(post => {
        return (
          <li key={post.id} onClick={e => this.handleClickPost(post)}>
            {post.title} by {post.user.name}
          </li>
        );
      });
    }
  }

  render(): React.ReactNode {
    return (
      <div>
        <ul>{this.showList()}</ul>
        {JSON.stringify(this.state.selected)}
      </div>
    );
  }
}

// export default PostList;
export default withPostList(PostList);
