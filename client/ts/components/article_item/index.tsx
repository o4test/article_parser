import './styles.scss';
import * as React from 'react';

import Editable from './editable';
import Approvable from './approvable';

interface IProps {
  // type of the page
  type: string;
  // data for the component
  data: any;
}

export default class ArticleItem extends React.Component<IProps, any> {
  render() {
    const {type, data} = this.props;
    // render html
    return (
      <div className="paragraph">
        {
          type === 'editable' ?
            <Editable {...data} /> :
            <Approvable {...data}/>
        }
      </div>
    );
  }

}
