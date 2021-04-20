import React, { useRef, useEffect, useCallback, useState } from "react";
import { Rect as KonvaRectangle, Transformer, Image } from "react-konva";

import { LIMITS } from "./constants";
import { selectShape, transformRectangleShape, moveShape } from "./state";
import Shape31 from './assets/tile4.png'

const boundBoxCallbackForRectangle = (oldBox, newBox) => {
  // limit resize
  if (
    newBox.width < LIMITS.RECT.MIN ||
    newBox.height < LIMITS.RECT.MIN ||
    newBox.width > LIMITS.RECT.MAX ||
    newBox.height > LIMITS.RECT.MAX
  ) {
    return oldBox;
  }
  return newBox;
};

export function Shape3({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  const transformerRef = useRef();
  const img1 = new window.Image();
  img1.src = Shape31
  const [image, setImage] = useState(img1);

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    const img = new window.Image();
    img.src = Shape31
    setImage(img);
  }, []);

  const handleSelect = useCallback(
    (event) => {
      event.cancelBubble = true;

      selectShape(id);
    },
    [id]
  );

  const handleDrag = useCallback(
    (event) => {
      moveShape(id, event);
    },
    [id]
  );

  const handleTransform = useCallback(
    (event) => {
      transformRectangleShape(shapeRef.current, id, event);
    },
    [id]
  );

  return (
    <>
      <Image
       image={image}
       onClick={handleSelect}
       onTap={handleSelect}
       onDragStart={handleSelect}
       ref={shapeRef}
       // {...shapeProps}
       x={shapeProps.x * 40}
       y={1000 - shapeProps.y* 40}
       rotation={shapeProps.rotation}
       width={shapeProps.width}
       offsetX = {shapeProps.width/2}
       offsetY ={shapeProps.height/2}
       height ={shapeProps.height}
       draggable
       onDragEnd={handleDrag}
       onTransformEnd={handleTransform}
      />
      {isSelected && (
        <Transformer
          anchorSize={5}
          borderDash={[6, 2]}
          ref={transformerRef}
          boundBoxFunc={boundBoxCallbackForRectangle}
        />
      )}
    </>
  );
}

