import * as React from 'react';
import Dispatcher from '../../dispatcher';

// Component props interface
interface IProps {
  // Original text of the paragraph
  text: string;
  // Url of the article
  articleUrl: string;
}

// Component props interface
interface IState {
  // If we need, we can set any Error, which we can display at the bottom of the block
  error: string;
  // Last text that we sent
  prevText: string;
}

export default class Editable extends React.Component<IProps, IState> {
  private textarea: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      error: '',
      prevText: props.text,
    };
  }

  render() {
    const {text} = this.props;
    const {error} = this.state;
    // get page content
    return (
      <div className="editable">
        <div className="original-text">
          <div className="title">Original Text</div>
          <p>{text}</p>
        </div>
        <div className="proposed-text">
          <div className="title">Users Version</div>
          <textarea ref={(textarea) => this.textarea = textarea} defaultValue={text} />
        </div>

        <div className="buttons">
          <a href="" className="btn btn-success" onClick={this._save}>Send changes</a>
        </div>
        {
          error &&
          <div className="error-msg">{error}</div>
        }
      </div>
    );
  }

  /**
   * Save proposed text
   * @private
   */
  _save = (e: any) => {
    e.preventDefault();
    const {text, articleUrl} = this.props;
    const usersText = this.textarea.value;

    // If text didn't change, skip
    if (usersText === text) {
      this.setState({error: 'You cannot propose the same text with original'});
      return;
    }

    if (usersText === this.state.prevText) {
      this.setState({error: 'You cannot propose the same text more than one time'});
      return;
    }

    // Mark text to not duplicate and remove error
    this.setState({
      error: '',
      prevText: usersText,
    });

    // Save this text
    Dispatcher.actions.saveOne({
      articleUrl,
      originalText: text,
      usersText: this.textarea.value,
    });
  }

}
