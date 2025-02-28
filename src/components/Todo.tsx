import React, { useContext, useState } from "react";
import { type Todo as TodoType } from "../types";
import { TodoContext } from "../context/TodoContext";

const DRAG_THRESHOLD = -155;
const DRAG_LIMIT = -200;
const CAN_HOVER = window.matchMedia("(hover: hover)").matches;

export const Todo: React.FC<TodoType> = ({ id, title, completed }) => {
  const { removeTodo, toggleCompleted } = useContext(TodoContext);
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setOffsetX(event.clientX - position);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newX = event.clientX - offsetX;
    const clampedX = Math.max(Math.min(newX, 0), DRAG_LIMIT);
    setPosition(clampedX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (position < DRAG_THRESHOLD) {
      removeTodo({ id });
    } else {
      setPosition(0);
    }
    setIsDragging(false);
  };

  return (
    <section className="relative">
      <div
        className={`bg-[#1F2123] rounded-3xl px-4 py-7 flex items-center cursor-grab active:cursor-grabbing ${
          isDragging
            ? "transition-none"
            : "transition-transform duration-300 ease-out"
        }`}
        style={{
          transform: `translateX(${position}px)`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="flex w-full gap-5 items-center">
          <label
            className={`rounded-full w-8 h-8 flex items-center justify-center relative transition-colors cursor-pointer ${
              completed ? "bg-[#1E5CE3]" : "bg-[#262A32]"
            }`}
          >
            <div className="absolute bg-[#1F2123] w-4 h-4 rounded-full pointer-events-none"></div>
            <input
              className="w-8 h-8 opacity-0 absolute inset-0 cursor-pointer z-10"
              type="checkbox"
              checked={completed}
              onChange={(event) => {
                toggleCompleted({ id, completed: event.target.checked });
              }}
            />
          </label>
          <h3 className="relative -top-1 select-none">{title}</h3>
        </div>
        <button
          className={`relative bottom-0.5 text-3xl px-2 font-bold flex items-center justify-center ${
            CAN_HOVER ? "text-transparent hover:text-[#F63E3E]" : ""
          }`}
          onClick={() => removeTodo({ id })}
          aria-label="Delete task"
        >
          ×
        </button>
      </div>
    </section>
  );
};
