import React, { useRef, useCallback } from "react";
import { Layer, Stage, Rect } from "react-konva";

import {
  useShapes,
  clearSelection,
  createRectangle,
  createShape1,
  createShape2,
  createShape3,
  createShape4,
  createShape5,
  saveDiagram,
  reset,
  createLumia,
  createEnemy,
  createEnergy,
  createLamp,
  deleteShape
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
      switch(type){
        case(SHAPE_TYPES.RECT):
          createRectangle({
            x: (coords.x - (offsetX-60))/40,
            y: (1000 -(coords.y - (offsetY-60)))/40,
          });
          break;

        case(SHAPE_TYPES.LUMIA):
          createLumia({
            x: (coords.x - (offsetX-60))/40,
            y: (1000 -(coords.y - (offsetY-60)))/40,
          });
          break;

        case(SHAPE_TYPES.ENEMY):
          // console.log("here")
          createEnemy({
            x: (coords.x - (offsetX-60))/40,
            y: (1000 -(coords.y - (offsetY-60)))/40,
          });
          break;

        case(SHAPE_TYPES.ENERGY):
          // console.log("here")
          createEnergy({
            x: (coords.x - (offsetX-60))/40,
            y: (1000 -(coords.y - (offsetY-60)))/40,
          });
          break;

        case(SHAPE_TYPES.LAMP):
          // console.log("here")
          createLamp({
            x: (coords.x - (offsetX-60))/40,
            y: (1000 -(coords.y - (offsetY-60)))/40,
          });
          break;

        case(SHAPE_TYPES.Shape1):
          createShape1({
            x: (coords.x - (offsetX-60))/40,
            y: (1000 -(coords.y - (offsetY-60)))/40,
           });
           break;

        case(SHAPE_TYPES.Shape2):
          createShape2({
            x: (coords.x - (offsetX-60))/40,
            y: (1000 -(coords.y - (offsetY-10)))/40,
         });
         break;

        case(SHAPE_TYPES.Shape3):
          createShape3({
            x: (coords.x - (offsetX-60))/40,
            y: (1000 -(coords.y - (offsetY-10)))/40,
          });
          break;

        case(SHAPE_TYPES.Shape4):
          createShape4({
            x: (coords.x - (offsetX-10))/40,
            y: (1000 -(coords.y - (offsetY-10)))/40,
          });
          break;

          case(SHAPE_TYPES.Shape5):
          createShape5({
            x: (coords.x - (offsetX-60))/40,
            y: (1000 -(coords.y - (offsetY-60)))/40,
          });
          break;

      }
     
    }
  }, []);

  const gridComponents = [];
  var i = 0;
  for (var x = 0; x < window.innerWidth *1.5; x += WIDTH) {
    for (var y = 1000; y >=0; y -= HEIGHT) {
      if (i === 4) {
        i = 0;
      }
      gridComponents.push(
        <Rect
          key={`${x},${y}`}
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
        <button onClick={deleteShape}>delete</button>
      </div>
      <Stage
        className="container"
        ref={stageRef}
        width={window.innerWidth *1.5}
        height={1000}
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
