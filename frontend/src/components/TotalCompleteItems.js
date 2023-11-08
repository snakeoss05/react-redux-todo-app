import React from "react";
import { useSelector } from "react-redux";
const TotalCompleteItems = () => {
  const completedTodo = useSelector((state) =>
    state.todos.filter((todo) => todo.completed === true)
  );
  return <h4 className="mt-3">Total Complete Items: {completedTodo.length}</h4>;
};

export default TotalCompleteItems;
