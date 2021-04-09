import React, { useRef, useCallback } from "react";
import { Layer, Stage, Rect } from "react-konva";

import {
  useShapes,
  clearSelection,
  createCircle,
  createRectangle,
  createShape1,
  createShape2,
  createShape3,
  createShape4,
  saveDiagram,
  reset,
} from "./state";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "./constants";
import { Shape } from "./Shape";

const WIDTH = 40;
const HEIGHT = 40;


const handleDragOver = (event) => event.preventDefault();

export function Canvas() {
  const shapes = useShapes((state) => Object.entries(state.shapes));

  const stageRef = useRef();

  const handleDrop = useCallback((event) => {
    const draggedData = event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY);

    if (draggedData) {
      const { offsetX, offsetY, type, clientHeight, clientWidth } = JSON.parse(
        draggedData
      );

      stageRef.current.setPointersPositions(event);

      const coords = stageRef.current.getPointerPosition();

      if (type === SHAPE_TYPES.RECT) {
        // rectangle x, y is at the top,left corner
        createRectangle({
          x: coords.x - offsetX,
          y: coords.y - offsetY,
        });
      } else if (type === SHAPE_TYPES.CIRCLE) {
        // circle x, y is at the center of the circle
        createCircle({
          x: coords.x - (offsetX - clientWidth / 2),
          y: coords.y - (offsetY - clientHeight / 2),
        });
      }else if (type === SHAPE_TYPES.Shape1) {
        createShape1({
            x: coords.x - offsetX,
            y: coords.y - offsetY,
        });
      }else if (type === SHAPE_TYPES.Shape2) {
        createShape2({
            x: coords.x - offsetX,
            y: coords.y - offsetY,
        });
      }else if (type === SHAPE_TYPES.Shape3) {
        createShape3({
            x: coords.x - offsetX,
            y: coords.y - offsetY,
        });
      }else if (type === SHAPE_TYPES.Shape4) {
        createShape4({
            x: coords.x - offsetX,
            y: coords.y - offsetY,
        });
      }
    }
  }, []);

  const gridComponents = [];
  var i = 0;
  for (var x = 0; x < window.innerWidth *1.5; x += WIDTH) {
    for (var y = window.innerHeight; y >0; y -= HEIGHT) {
      if (i === 4) {
        i = 0;
      }


      gridComponents.push(
        <Rect
          x={x}
          y={y}
          width={WIDTH}
          height={HEIGHT}
          stroke="black"
        />
      );
    }
  }

  return (
    <main className="canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div className="buttons">
        <button onClick={saveDiagram}>Download</button>
        <button onClick={reset}>Reset</button>
      </div>
      <Stage
        className="container"
        ref={stageRef}
        width={window.innerWidth *1.5}
        height={window.innerHeight}
        onClick={clearSelection}
      >
        <Layer>
          {gridComponents}
          {shapes.map(([key, shape]) => (
            <Shape key={key} shape={{ ...shape, id: key }} />
          ))}
        </Layer>
      </Stage>
    </main>
  );
}
