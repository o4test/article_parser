import './styles.scss';
import * as React from 'react';
import articleStore  from '../stores/article_store';

import EditArticle from './article_paragraphs';
import List from './unapproved_list';

// State structure
interface IState {
  // page type, that we using
  page: string;
}

export default class Main extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      page: articleStore.getArticle() || 'list',
    };
  }

  componentDidMount() {
    // Listen store changes
    articleStore.addChangeListener(this._update);
  }

  componentWillUnmount() {
    // Stop listen store changes
    articleStore.removeChangeListener(this._update);
  }

  render() {
    return (
      <div className="publishes_wrap">
        {this.state.page === 'article' ? <EditArticle/> : <List/>}
      </div>
    );
  }

  /**
   * Update component
   * @private
   */
  private _update = () => {
    this.setState({
      page: articleStore.getCurrentPage(),
    });
  }
}
