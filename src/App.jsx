import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  // const [editedInputVal, setEditedInputVal] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState();

  const handleAdd = (inputValue) => {
    setTodo((prev) => {
      return [
        ...prev,
        { title: inputValue, id: crypto.randomUUID(), isEditing: false },
      ];
    });
  };
  const handleDelete = (id) => {
    const filteredValue = todo.filter((el) => el.id !== id);
    setTodo(filteredValue);
  };
  const handleEdit = (uniqueId) => {
    // console.log(uniqueId,'unique')
    //console.log(latestValue, "latestValue");
    setTodo((prev) => {
      return prev.map((el) => {
        return uniqueId === el.id ? { ...el, isEditing: !el.isEditing } : el
      });
    }); 
  };
  const handleSave = (uniqueId,latestValue) => {
    setTodo((prev) => {
      return prev.map((el) => {
        return (
          uniqueId == el.id ?  { ...el, title: latestValue, isEditing: false } : el
        );
      });
    }); 
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input onChange={(e) => setInput(e.target.value)} type="text" />
        <button onClick={() => handleAdd(input)}>Add</button>
      </div>
      <div>
        {todo.map((todo) => {
          return (
            <>
              <div id={todo.id}>
                {todo.isEditing ? (
                  <input
                    type="text"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                  />
                ) : (
                  <span>{todo.title}</span>
                )}
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                { todo.isEditing ? (
                  <button onClick={() => handleSave(todo.id,todoTitle)}>
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setTodoTitle(todo.title);
                      handleEdit(todo.id);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default App;
