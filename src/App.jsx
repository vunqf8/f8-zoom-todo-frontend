import { useEffect, useState } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm lấy danh sách tasks từ API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/api/tasks`);
        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy tasks:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    fetch(
      `${API_URL}/bypass-cors?url=https://api-gateway.fullstack.edu.vn/api/analytics`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network error");

        return res.json();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }, []);

  // Thêm task mới
  const addTask = async (title) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      }
    } catch (error) {
      console.error("Lỗi khi thêm task:", error);
    }
  };

  // Toggle completed
  const toggleCompleted = async (id, isCompleted) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật task:", error);
    }
  };

  // Xóa task
  const deleteTask = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa task này?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("Lỗi khi xóa task:", error);
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="app">
      <h1>📝 Todo App</h1>
      <TaskInput onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggle={toggleCompleted}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;
