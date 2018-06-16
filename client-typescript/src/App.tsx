import * as React from 'react';
import PostList from './components/PostList';

interface AppProps {}
interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  render(): React.ReactNode {
    return <PostList />;
  }
}

export default App;
