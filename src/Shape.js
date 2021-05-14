import React, { useCallback } from "react";

import { SHAPE_TYPES } from "./constants";
import { useShapes } from "./state";
import { Lumia } from "./Lumia";
import { Enemy } from "./Enemy";
import {Lamp} from "./Lamp";
import {Energy} from "./Energy"
import { Rectangle } from "./Rectangle";
import { Shape1 } from "./Shape1";
import { Shape2 } from "./Shape2";
import { Shape3 } from "./Shape3";
import { Shape4 } from "./Shape4";
import { Shape5 } from "./Shape5";
import { StickyWall } from "./StickyWall";

export function Shape({ shape }) {
  const isSelectedSelector = useCallback(
    (state) => state.selected === shape.id,
    [shape]
  );
  const isSelected = useShapes(isSelectedSelector);

  if (shape.type === SHAPE_TYPES.RECT) {
    return <Rectangle {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.LUMIA) {
    return <Lumia {...shape} isSelected={isSelected} />;
  } else if (shape.type === SHAPE_TYPES.Shape1) {
    return <Shape1 {...shape} isSelected={isSelected} />
  }else if (shape.type === SHAPE_TYPES.Shape2) {
    return <Shape2 {...shape} isSelected={isSelected} />
  }else if (shape.type === SHAPE_TYPES.Shape3) {
    return <Shape3 {...shape} isSelected={isSelected} />
  }else if (shape.type === SHAPE_TYPES.Shape4) {
    return <Shape4 {...shape} isSelected={isSelected} />
  }else if (shape.type === SHAPE_TYPES.ENEMY) {
    return <Enemy {...shape} isSelected={isSelected} />
  }else if (shape.type === SHAPE_TYPES.ENERGY) {
    return <Energy {...shape} isSelected={isSelected} />
  }else if (shape.type === SHAPE_TYPES.LAMP) {
    return <Lamp {...shape} isSelected={isSelected} />
  }else if (shape.type === SHAPE_TYPES.Shape5) {
    return <Shape5 {...shape} isSelected={isSelected} />
  }else if (shape.type === SHAPE_TYPES.Sticky) {
    return <StickyWall {...shape} isSelected={isSelected} />
  }

  return null;
}
