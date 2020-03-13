import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";
import { Container } from "semantic-ui-react";

export default class App extends React.Component {
  state = {
    todos: [],
    loadTodoError: false,
    errorStatusCode: null,
    loading: true
  };

  addTodo = todo => {
    console.log(todo);
    // post todo

    axios
      .post("api/items", {
        // data
        name: todo.name,
        complete: todo.complete
      })
      .then(res => {
        //success
        console.log(res);
        const newArray = [res.data, ...this.state.todos];
        this.setState({
          todos: newArray
        });
      })
      .catch(err => {
        //error
        console.log(err);
      });
  };
  updateTodo = (todoFromForm, id) => {
    axios
      .put(`api/items/${id}`, {
        name: todoFromForm.name,
        complete: todoFromForm.complete
      })
      .then(res => {
        const newArray = this.state.todos.map(currentTodo => {
          if (currentTodo.id != id) return currentTodo;
          return { ...currentTodo, ...todoFromForm };
          // return {
          //   ...currentTodo,
          //   name: todoFromForm.name,
          //   complete: todoFromForm.complete
          // };
        });
        this.setState({
          todos: newArray
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  renderTodos() {
    if (this.state.loading) {
      return "loading";
    }
    if (this.state.loadTodoError) {
      return (
        <>
          <h1 style={{ color: "red" }}>Error</h1>
          <p>status Code: {this.state.errorStatusCode}</p>
        </>
      );
    }
    return this.state.todos.map(todo => {
      return (
        <Todo
          key={`todo-${todo.id}`}
          {...todo}
          updateTodoProp={this.updateTodo}
        />
      );
      // return <Todo key={`todo-${todo.id}`} name={todo.name} complete={todo.complete} id={todo.id} />
    });
  }
  componentDidMount() {
    console.log("get data here");
    axios
      .get("api/items")
      .then(res => {
        // success
        this.setState({
          loading: false,
          todos: res.data,
          errorStatusCode: res.status
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          loadTodoError: true,
          errorStatusCode: err.toString()
        });
      });
  }
  render() {
    return (
      <Container>
        <TodoForm addTodoProp={this.addTodo} />
        {this.renderTodos()}
      </Container>
    );
  }
}
