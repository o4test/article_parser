import * as React from 'react';
import ArticleItem from '../../components/article_item';
import articleStore  from '../../stores/article_store';

export default class List extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      items: articleStore.getUnapprovedList(),
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      items: articleStore.getUnapprovedList(),
    });
  }

  render() {
    const {items = []} = this.state;
    return (
      <div className="publishes_wrap">
        <h2>Users texts suggestions</h2>
        {
          items.length ?
          items.map((item, index) => <ArticleItem key={index} type="approvable" data={item} />) :
            <div className="no-items">Users didn't add any text corrections</div>
        }
      </div>
    );
  }
}
