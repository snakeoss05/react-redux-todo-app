import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { getTdoAsync } from "../redux/todoSlice";
const CompletedList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) =>
    state.todos.filter((todo) => todo.completed === true)
  );
  useEffect(() => {
    dispatch(getTdoAsync());
  }, [dispatch]);
  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
      ))}
    </ul>
  );
};

export default CompletedList;
