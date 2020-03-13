import React from "react";
import { Form, Button } from "semantic-ui-react";

export default class TodoForm extends React.Component {
  state = {
    name: this.props.name,
    complete: this.props.complete == undefined ? false : this.props.complete
  };

  handleSubmit = event => {
    event.preventDefault();
    // here we want to do a patch/put
    if(this.props.id){
      //update function
      this.props.updateTodoProp(this.state, this.props.id )
    } else{
      this.props.addTodoProp(this.state)
    }
   
    this.setState({
      name:'',
      complete: false
    })
  };
  handleChange = event => {
    this.setState({
      // name: event.target.value
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="Todo"
          name="name"
          placeholder="enter a todo"
          required
          onChange={this.handleChange}
          value={this.state.name}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}
