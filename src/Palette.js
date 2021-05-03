import React from "react";
import Shape1 from './assets/tile1.png'
import Shape2 from './assets/tile3.png'
import Shape3 from './assets/tile4.png'
import Shape4 from './assets/tile6.png'
import Shape5 from './assets/tile8.png'
import Lumia from './assets/lumia.png'
import Lamp from './assets/lamp.png'
import Energy from './assets/energy.png'
import Enemy from './assets/enemy.png'

import { DRAG_DATA_KEY, SHAPE_TYPES } from "./constants";

const handleDragStart = (event) => {
  const type = event.target.dataset.shape;
  if (type) {
    // x,y coordinates of the mouse pointer relative to the position of the padding edge of the target node
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    // dimensions of the node on the browser
    const clientWidth = event.target.clientWidth;
    const clientHeight = event.target.clientHeight;

    const dragPayload = JSON.stringify({
      type,
      offsetX,
      offsetY,
      clientWidth,
      clientHeight,
    });

    event.nativeEvent.dataTransfer.setData(DRAG_DATA_KEY, dragPayload);
  }
};

export function Palette() {
  return (
    <aside className="palette">
      <h2>Tiles</h2>
      <img
        src={Shape1} 
        className="shape"
        data-shape={SHAPE_TYPES.Shape1}
        draggable
        onDragStart={handleDragStart}
      />
       <img
       src={Shape2} 
        className="shape2"
        data-shape={SHAPE_TYPES.Shape2}
        draggable
        onDragStart={handleDragStart}
      />
       <img
       src={Shape3} 
        className="shape"
        data-shape={SHAPE_TYPES.Shape3}
        draggable
        onDragStart={handleDragStart}
      />
     <img
       src={Shape4} 
        className="shape"
        data-shape={SHAPE_TYPES.Shape4}
        draggable
        onDragStart={handleDragStart}
      />
      <img
       src={Shape5} 
        className="shape"
        data-shape={SHAPE_TYPES.Shape5}
        draggable
        onDragStart={handleDragStart}
      />
     <h2>Lumia</h2>
      <img
       src={Lumia} 
        className="shape"
        data-shape={SHAPE_TYPES.LUMIA}
        draggable
        onDragStart={handleDragStart}
      />
    <h2>Enemy</h2>
      <img
       src={Enemy} 
        className="shape"
        data-shape={SHAPE_TYPES.ENEMY}
        draggable
        onDragStart={handleDragStart}
      />
      <h2>Energy</h2>
      <img
       src={Energy} 
        className="shape"
        data-shape={SHAPE_TYPES.ENERGY}
        draggable
        onDragStart={handleDragStart}
      />
      <h2>Lamp</h2>
      <img
       src={Lamp} 
        className="shape"
        data-shape={SHAPE_TYPES.LAMP}
        draggable
        onDragStart={handleDragStart}
      />

    </aside>
  );
}
