"use client";

import { useRef, useState } from "react";

export default function ImageSelector({ onSelect }: any) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [start, setStart] = useState<any>(null);
  const [box, setBox] = useState<any>(null);

  function handleMouseDown(e: any) {
    const rect = imgRef.current!.getBoundingClientRect();
    setStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  function handleMouseMove(e: any) {
    if (!start) return;
    const rect = imgRef.current!.getBoundingClientRect();

    const current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setBox({
      x: Math.min(start.x, current.x),
      y: Math.min(start.y, current.y),
      w: Math.abs(start.x - current.x),
      h: Math.abs(start.y - current.y),
    });
  }

  function handleMouseUp() {
    if (box) {
      onSelect(box);
    }
    setStart(null);
  }

  return (
    <div className="relative">
      <img
        ref={imgRef}
        src="/temp-upload.jpg"
        className="w-full rounded"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />

      {box && (
        <div
          className="absolute border-2 border-emerald-400 bg-emerald-400/20"
          style={{
            left: box.x,
            top: box.y,
            width: box.w,
            height: box.h,
          }}
        />
      )}
    </div>
  );
}