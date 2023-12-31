import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTdoAsync = createAsyncThunk("todos/getTodoAsync", async () => {
  const response = await fetch("http://localhost:7000/todos");
  if (response.ok) {
    const todos = await response.json();
    return { todos };
  }
});
export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const resp = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });

    if (resp.ok) {
      const todo = await resp.json();
      return { todo };
    }
  }
);
export const updateCompletedAsync = createAsyncThunk(
  "todos/completeTodoAsync",
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });
    if (response.ok) {
      const todo = await response.json();
      return { id: todo.id, completed: todo.completed };
    }
  }
);
export const deleteTodoAsync = createAsyncThunk(
  "tdos/deleteTodoAsync",
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return { id: payload.id };
    }
  }
);
const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, title: "todo1", completed: false },
    { id: 2, title: "todo2", completed: false },
    { id: 3, title: "todo3", completed: true },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTdoAsync.pending]: (state, action) => {
      console.log("fetching data ...");
    },
    [getTdoAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [updateCompletedAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
