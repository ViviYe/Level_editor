import { createStore } from "@halka/state";
import produce from "immer";
import clamp from "clamp";
import { nanoid } from "nanoid";

import { SHAPE_TYPES, DEFAULTS, LIMITS } from "./constants";

const APP_NAMESPACE = "__integrtr_diagrams__";

const baseState = {
  selected: null,
  shapes: {},
};

export const useShapes = createStore(() => {
  const initialState = JSON.parse(localStorage.getItem(APP_NAMESPACE));

  return { ...baseState, shapes: initialState ?? {} };
});
const setState = (fn) => useShapes.set(produce(fn));

export const saveDiagram = () => {
  const state = useShapes.get();

  var json_obj = {
      level:{
        lumia:{},
        energies:[],
        platforms:[],
        tiles:[]
      }
  }
  for (const [_, value] of Object.entries(state.shapes)) {
     
      var new_obj = {
        "file": value['type'],
        "angle": value['rotation'],
        "x": value['x']/40,
        "y": (window.innerHeight - value['y'])/40
      }
      json_obj['level']['tiles'].push(new_obj)
  }


  const json = JSON.stringify(json_obj)
  const fileName = "test";
  const blob = new Blob([json], { type: "application/json" });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const reset = () => {
  localStorage.removeItem(APP_NAMESPACE);

  useShapes.set(baseState);
};

export const createRectangle = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.RECT,
      width: DEFAULTS.RECT.WIDTH,
      height: DEFAULTS.RECT.HEIGHT,
      fill: DEFAULTS.RECT.FILL,
      stroke: DEFAULTS.RECT.STROKE,
      rotation: DEFAULTS.RECT.ROTATION,
      x,
      y,
    };
  });
};

export const createShape1 = ({ x, y }) => {
    setState((state) => {
        state.shapes[nanoid()] = {
          type: SHAPE_TYPES.Shape1,
          width: 120,
          height: 120,
          rotation: DEFAULTS.RECT.ROTATION,
          x,
          y,
        };
      });
  };

  export const createShape2 = ({ x, y }) => {
    setState((state) => {
        state.shapes[nanoid()] = {
          type: SHAPE_TYPES.Shape2,
          width: 120,
          height: 20,
          rotation: DEFAULTS.RECT.ROTATION,
          x,
          y,
        };
      });
  };

  export const createShape3 = ({ x, y }) => {
    setState((state) => {
        state.shapes[nanoid()] = {
          type: SHAPE_TYPES.Shape3,
          width: 120,
          height: 120,
          rotation: DEFAULTS.RECT.ROTATION,
          x,
          y,
        };
      });
  };

  export const createShape4 = ({ x, y }) => {
    setState((state) => {
        state.shapes[nanoid()] = {
          type: SHAPE_TYPES.Shape4,
          width: 140,
          height: 140,
          rotation: DEFAULTS.RECT.ROTATION,
          x,
          y,
        };
      });
  };
  
  

export const createCircle = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.CIRCLE,
      width: 100,
      height: 100,
      x,
      y,
    };
  });
};

export const selectShape = (id) => {
  setState((state) => {
    state.selected = id;
  });
};

export const clearSelection = () => {
  setState((state) => {
    state.selected = null;
  });
};

export const moveShape = (id, event) => {
  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = event.target.x();
      shape.y = event.target.y();
    }
  });
};

export const updateAttribute = (attr, value) => {
  setState((state) => {
    const shape = state.shapes[state.selected];

    if (shape) {
      shape[attr] = value;
    }
  });
};

export const transformRectangleShape = (node, id, event) => {
  // transformer is changing scale of the node
  // and NOT its width or height
  // but in the store we have only width and height
  // to match the data better we will reset scale on transform end
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  // we will reset the scale back
  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();

      shape.rotation = node.rotation();

      shape.width = clamp(
        // increase the width in order of the scale
        node.width() * scaleX,
        // should not be less than the minimum width
        LIMITS.RECT.MIN,
        // should not be more than the maximum width
        LIMITS.RECT.MAX
      );
      shape.height = clamp(
        node.height() * scaleY,
        LIMITS.RECT.MIN,
        LIMITS.RECT.MAX
      );
    }
  });
};

export const transformCircleShape = (node, id, event) => {
  // transformer is changing scale of the node
  // and NOT its width or height
  // but in the store we have only width and height
  // to match the data better we will reset scale on transform end
  const scaleX = node.scaleX();

  // we will reset the scale back
  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();

      shape.radius = clamp(
        (node.width() * scaleX) / 2,
        LIMITS.CIRCLE.MIN,
        LIMITS.CIRCLE.MAX
      );
    }
  });
};