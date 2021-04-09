import React, { useCallback } from "react";

import { SHAPE_TYPES } from "./constants";
import { useShapes } from "./state";
import { Lumia } from "./Lumia";
import { Rectangle } from "./Rectangle";
import { Shape1 } from "./Shape1";
import { Shape2 } from "./Shape2";
import { Shape3 } from "./Shape3";
import { Shape4 } from "./Shape4";

export function Shape({ shape }) {
  console.log(shape.type);
  const isSelectedSelector = useCallback(
    (state) => state.selected === shape.id,
    [shape]
  );
  const isSelected = useShapes(isSelectedSelector);

  if (shape.type === SHAPE_TYPES.RECT) {
    return <Rectangle {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.CIRCLE) {
    return <Lumia {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.Shape1) {
    return <Shape1 {...shape} isSelected={isSelected} />
  }else if (shape.type === SHAPE_TYPES.Shape2) {
    return <Shape2 {...shape} isSelected={isSelected} />
  }else if (shape.type === SHAPE_TYPES.Shape3) {
    return <Shape3 {...shape} isSelected={isSelected} />
  }else if (shape.type === SHAPE_TYPES.Shape4) {
    return <Shape4 {...shape} isSelected={isSelected} />
  }

  return null;
}
