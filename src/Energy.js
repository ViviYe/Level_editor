import React, { useRef, useEffect, useCallback, useState} from "react";
import { Circle as KonvaCircle, Transformer, Image } from "react-konva";

import { LIMITS } from "./constants";
import { selectShape, transformCircleShape, moveShape } from "./state";
import Energy_asset from './assets/energy.png'

const boundBoxCallbackForCircle = (oldBox, newBox) => {
  // limit resize
  if (
    newBox.width < LIMITS.CIRCLE.MIN ||
    newBox.height < LIMITS.CIRCLE.MIN ||
    newBox.width > LIMITS.CIRCLE.MAX ||
    newBox.height > LIMITS.CIRCLE.MAX
  ) {
    return oldBox;
  }
  return newBox;
};

export function Energy({ id, isSelected, type, ...shapeProps }) {
  const shapeRef = useRef();
  const transformerRef = useRef();
  const [image, setImage] = useState(new window.Image());

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);


  useEffect(() => {
    const img = new window.Image();
    img.src = Energy_asset
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
      transformCircleShape(shapeRef.current, id, event);
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
          rotateEnabled={false}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-right",
            "bottom-left",
          ]}
          boundBoxFunc={boundBoxCallbackForCircle}
        />
      )}
    </>
  );
}
