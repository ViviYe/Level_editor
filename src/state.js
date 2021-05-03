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
        xBound: 30,
        yBound: 20,
        lumia:{},
        energies:[],
        platforms:[],
        plants:[],
        tiles:[],
        enemies:[],
        buttondoors: []
      }
  }
  for (const [_, value] of Object.entries(state.shapes)) {

    if (value['x'].toFixed(2) > json_obj['level']['xBound']){
      json_obj['level']['xBound'] = value['x'].toFixed(2)
    }
    if (value['y'].toFixed(2) > json_obj['level']['yBound']){
      json_obj['level']['xBound'] = value['y'].toFixed(2)
    }
    switch(value['type']) {
      case SHAPE_TYPES.Shape1:
        var new_obj = {
          "type": 1,
          "texture": value["texture"],
          "angle": -1.0 * value['rotation']/180.0 * 3.14,
          "posx": 1.0 * value['x'].toFixed(2),
          "posy": 1.0 * value['y'].toFixed(2),
        }
        json_obj['level']['tiles'].push(new_obj)
        break;

      case SHAPE_TYPES.Shape2:
        var new_obj = {
          "type": 3,
          "texture": value["texture"],
          "angle": -1.0 * value['rotation'].toFixed(2)/180.0 * 3.14,
          "posx": 1.0 * value['x'].toFixed(2),
          "posy": 1.0 * value['y'].toFixed(2),
        }
        json_obj['level']['tiles'].push(new_obj)
        break;

      case SHAPE_TYPES.Shape3:
          var new_obj = {
            "type": 2,
            "texture": "tile4",
            "angle": -3.14 * value['rotation']/180.0,
            "posx": 1.0 * value['x'].toFixed(2),
            "posy": 1.0 * value['y'].toFixed(2),
          }
          json_obj['level']['tiles'].push(new_obj)
          break;

      case SHAPE_TYPES.Shape4:
            var new_obj = {
              "type": 4,
              "texture": "tile6",
              "angle": -1.0 * value['rotation']/180.0 * 3.14,
              "posx": 1.0 * value['x'].toFixed(2),
              "posy": 1.0 * value['y'].toFixed(2),
            }
            json_obj['level']['tiles'].push(new_obj)
            break;


      case SHAPE_TYPES.Shape5:
              var new_obj = {
                "type": 5,
                "texture": "tile8",
                "angle": -1.0 * value['rotation']/180.0 * 3.14,
                "posx": 1.0 * value['x'].toFixed(2),
                "posy": 1.0 * value['y'].toFixed(2),
              }
              json_obj['level']['tiles'].push(new_obj)
              break;
  

      case SHAPE_TYPES.LUMIA:
            var new_obj = {
              "sizelevel": 2,
              "posx": 1.0 * value['x'].toFixed(2),
              "posy": 1.0 * value['y'].toFixed(2),
            }
            json_obj['level']['lumia'] = new_obj   
            break;

      case SHAPE_TYPES.ENEMY:
            var new_obj = {
              "sizelevel": 1,
              "posx": 1.0 * value['x'].toFixed(2),
              "posy": 1.0 * value['y'].toFixed(2),
            }
            json_obj['level']['enemies'].push(new_obj)
            break;

      case SHAPE_TYPES.LAMP:
              var new_obj = {
                "angle": -1.0 * value['rotation']/180.0 * 3.14,
                "posx": 1.0 * value['x'].toFixed(2),
                "posy": 1.0 * value['y'].toFixed(2),
              }
              json_obj['level']['plants'].push(new_obj)
              break;

      case SHAPE_TYPES.ENERGY:
                var new_obj = {
                  "posx": 1.0 * value['x'].toFixed(2),
                  "posy": 1.0 * value['y'].toFixed(2),
                }
                json_obj['level']['energies'].push(new_obj)
                break;
      default:
          var new_obj = {}
    }
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
          rotation: 0,
          x,
          y: y,
          texture: "tile1",
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
          texture: "tile3",
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

  export const createShape5 = ({ x, y }) => {
    setState((state) => {
        state.shapes[nanoid()] = {
          type: SHAPE_TYPES.Shape5,
          width: 20,
          height: 20,
          rotation: 0,
          x,
          y,
        };
      });
  };
  
  

export const createLumia = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.LUMIA,
      width: 80,
      height: 80,
      x,
      y,
    };
  });
};

export const createEnemy = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.ENEMY,
      width: 80,
      height: 80,
      x,
      y,
    };
  });
};

export const createEnergy = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.ENERGY,
      width: 40,
      height: 40,
      x,
      y,
    };
  });
};

export const createLamp = ({ x, y }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.LAMP,
      width: 40,
      height: 40,
      x,
      y,
      rotation: 0
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
      shape.x = event.target.x()/40;
      shape.y = (1000 - event.target.y())/40;
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
      shape.rotation = node.rotation();
      shape.x = node.x()/40;
      shape.y = (1000 - node.y())/40;


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
    }
  });
};
