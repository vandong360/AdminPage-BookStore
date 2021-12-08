import React from 'react';
import './InputQuantity.css'

class InputQuantity extends React.Component {
  constructor() {
    super();
    this.state = { value: 1 };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    if (this.state.value >= 10) this.setState({ value: 10 });
    else this.setState({ value: this.state.value + 1 });
  } 

  decrement() {
    if (this.state.value <= 1) this.setState({ value: 1 });
    else this.setState({ value: this.state.value - 1 }); 
  }

  render() {
    return (
      <div className="qty-input">
        <button className="qty-count qty-count--minus" data-action="minus" type="button" onClick={this.decrement}>-</button>
        <input className="product-qty" type="number" name="product-qty" min="0" max="10" value={ this.state.value}/>
        <button className ="qty-count qty-count--add" data-action="add" type ="button" onClick={this.increment}>+</button>
      </div>
    );
  }
}

export default InputQuantity;
