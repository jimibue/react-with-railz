import React from "react";
import { Button, Card } from "semantic-ui-react";
import TodoForm from "./TodoForm";

export default class Todo extends React.Component {
  state = {
    showForm: false
  };

  showForm() {
    return (
      <TodoForm
        updateTodoProp={this.props.updateTodoProp} 
        name={this.props.name}
        id={this.props.id}
        completed={this.props.completed}
      />
    );
  }
  showTodo() {
    return (
      <>
        <Card.Meta content={this.props.id} />
        <Card.Description content={this.props.name} />
      </>
    );
  }
  toggleForm = e => {
    this.setState({
      showForm: !this.state.showForm
    });
  };
  render() {
    return (
      <Card>
        <Card.Content>
          {this.state.showForm ? this.showForm() : this.showTodo()}
          <Button onClick={this.toggleForm}>
            {this.state.showForm ? "hide form" : "edit"}
          </Button>
        </Card.Content>
      </Card>
    );
  }
}
