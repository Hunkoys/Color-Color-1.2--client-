import { Component } from 'react';
import { appendClassName } from '../../standard/standard';

const states = { normal: 'normal', pressed: 'pressed', hover: 'hover', disabled: 'disabled' };

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: '',
      disabled: this.props.disabled === true ? 'disabled' : '',
    };
  }

  render() {
    const action = this.props.action && !this.props.disabled ? () => this.props.action() : () => {};
    return (
      <div
        className={
          'Button' +
          appendClassName(this.state.className) +
          appendClassName(this.props.type) +
          appendClassName(this.state.disabled)
        }
        onClick={action}
        onMouseDown={() => this.setState({ className: `${states.hover} ${states.pressed}` })}
        onTouchStart={() => this.setState({ className: `${states.hover} ${states.pressed}` })}
        onMouseUp={() => this.setState({ className: states.hover })}
        onTouchEnd={() => this.setState({ className: '' })}
        onMouseEnter={() => this.setState({ className: states.hover })}
        onMouseLeave={() => this.setState({ className: '' })}
      >
        <div className="pill">
          <button>{this.props.children}</button>
        </div>
      </div>
    );
  }
}
