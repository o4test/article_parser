import * as React from 'react';
import ArticleItem from '../../components/article_item';
import articleStore  from '../../stores/article_store';

export default class EditArticle extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = articleStore.getArticle();
  }

  render() {
    const {title, paragraphs, articleUrl} = this.state;

    return (
      <div className="publishes_wrap">
        <h2>{title}</h2>
        {paragraphs.map((text, index) => <ArticleItem key={index} type="editable" data={{text, articleUrl}} />)}
        <a href="/fb/results">All proposed changes</a>
      </div>
    );
  }
}
