import { useContext, useState } from "react";
import { type Todo as TodoType } from "../types";
import { TodoContext } from "../context/TodoContext";

export const Todo: React.FC<TodoType> = ({ id, title, completed }) => {
  const { removeTodo, toggleCompleted } = useContext(TodoContext);
  const [canHover] = useState(window.matchMedia("(hover: hover)").matches);

  const [position, setPosition] = useState({ x: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0 });

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({
      x: event.clientX - position.x,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newX = event.clientX - offset.x;
      if (newX > 0 || newX < -150) return;

      setPosition({ x: newX });
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    const newX = event.clientX - offset.x;
    if (newX < -155) removeTodo({ id });

    setIsDragging(false);
    setPosition({ x: 0 });
  };

  return (
    <section
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="bg-[#1F2123] rounded-3xl px-4 py-7 flex items-center cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(${position.x}px)`,
          userSelect: isDragging ? "none" : "auto",
          transition: isDragging ? "none" : "transform 0.2s",
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex w-full gap-5 items-center">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center relative transition-colors ${
              completed ? "bg-[#1E5CE3]" : "bg-[#262A32]"
            }`}
          >
            <div className="absolute bg-[#1F2123] w-4 h-4 rounded-full"></div>
            <input
              className="size-8 opacity-0"
              type="checkbox"
              checked={completed}
              onChange={(event) => {
                toggleCompleted({ id, completed: event.target.checked });
              }}
            />
          </div>
          <label className="relative -top-1">{title}</label>
        </div>
        <button
          className={`relative bottom-0.5 text-3xl px-2 font-bold items-center justify-center ${
            canHover ? "text-transparent hover:text-[#F63E3E]" : ""
          }`}
          onClick={() => {
            removeTodo({ id });
          }}
        >
          ×
        </button>
      </div>
    </section>
  );
};
