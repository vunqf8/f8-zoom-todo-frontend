import { useState } from "react";

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = inputValue.trim();

    if (!title) {
      alert("Vui lòng nhập nội dung task!");
      return;
    }

    onAddTask(title);
    setInputValue("");
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Nhập task mới..."
      />
      <button type="submit">Thêm</button>
    </form>
  );
}

export default TaskInput;
