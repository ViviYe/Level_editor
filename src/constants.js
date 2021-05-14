export const SHAPE_TYPES = {
  RECT: "rect",
  LUMIA: "lumia",
  ENEMY: "enemy",
  ENERGY:"energy",
  LAMP:"lamp",
  Shape1: "shape1",
  Shape2: "shape2",
  Shape3: "shape3",
  Shape4: "shape4",
  Shape5: "shape5",
  Sticky: "sticky"
};

export const DEFAULTS = {
  RECT: {
    STROKE: "#000000",
    FILL: "#ffffff",
    WIDTH: 150,
    HEIGHT: 100,
    ROTATION: 0,
  },
  CIRCLE: {
    RADIUS: 50,
  },
  Shape1: {
    WIDTH: 150,
    HEIGHT: 150,
    ROTATION: 0,
  },
};

export const LIMITS = {
  RECT: {
    MAX: 1000,
    MIN: 10,
  },
  CIRCLE: {
    MAX: 500,
    MIN: 5,
  },
  Shape1: {
    MAX: 1000,
    MIN: 10,
  },
};

export const DRAG_DATA_KEY = "__drag_data_payload__";
