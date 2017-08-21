import * as React from 'react';
import Dispatcher from '../../dispatcher';

// Component props interface
interface IProps {
  usersText: string;
  originalText: any;
}

export default class ArticleItem extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {originalText, usersText} = this.props;

    return (
      <div className="aprovable">
        <div className="text-edit">
          <div className="text-edit__original">
            <div className="title">Original Text</div>
            <p>{originalText}</p>
          </div>
          <div className="text-edit__proposed">
            <div className="title">Users Text</div>
            <p>{usersText}</p>
          </div>
        </div>

        <div className="buttons">
          <a className="btn btn-danger" onClick={this._delete}>Delete</a>
          <a className="btn btn-info" onClick={this._approve}>Approve</a>
        </div>
      </div>
    );
  }

  /**
   * Approve item
   * @param e
   * @private
   */
  _approve = () => {
    const item = this.props;
    Dispatcher.actions.approveOne(item);
  }

  /**
   * Delete item
   * @param e
   * @private
   */
  _delete = () => {
    const item = this.props;
    Dispatcher.actions.deleteOne(item);
  }

}
