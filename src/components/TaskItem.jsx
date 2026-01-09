function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.isCompleted ? "completed" : ""}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.isCompleted}
        onChange={(e) => onToggle(task.id, e.target.checked)}
      />
      <span className="task-title">{task.title}</span>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        Xóa
      </button>
    </div>
  );
}

export default TaskItem;
