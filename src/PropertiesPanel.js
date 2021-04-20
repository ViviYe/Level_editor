import React, { useCallback } from "react";
import Select from 'react-select'
import Shape11 from './assets/tile1.png'
import Shape12 from './assets/tile2.png'
import Shape21 from './assets/tile3.png'
import Shape22 from './assets/tile5.png'
import Shape23 from './assets/tile7.png'
import Shape3 from './assets/tile4.png'
import Shape4 from './assets/tile6.png'

import { useShapes, updateAttribute } from "./state";
import { SHAPE_TYPES } from "./constants";

const shapeSelector = (state) => state.shapes[state.selected];

export function PropertiesPanel() {
const options_shape1 = [
        { value: "tile1", label: <img src={Shape11} height="60px" width="60px"/> },
        { value: 'tile2', label: <img src={Shape12} height="60px" width="60px"/>  },
      ]
const options_shape2 = [
        { value: "tile3", label: <img src={Shape21} height="10px" width="60px"/> },
        { value: 'tile5', label: <img src={Shape22} height="10px" width="60px"/>  },
        { value: 'tile7', label: <img src={Shape23} height="10px" width="60px"/>  },
      ]
const selectedShape = useShapes(shapeSelector);

const updateAttr = useCallback((event) => {
    const attr = event.target.name;
    updateAttribute(attr, parseInt(event.target.value));

  
  }, []);

  const updateTexture = useCallback((option) => {
    console.log("here")
    updateAttribute("texture", option.value);
  
  }, []);

  const getTextureOptions = (type) => {
    switch(type){
      case("shape1"):
      return options_shape1
      case("shape2"):
      return options_shape2
      default: return []
    }
  }

  return (
    <aside className="panel">
      <h2>Properties</h2>
      <div className="properties">
        {selectedShape ? (
          <>
            <div className="key">
              Type <span className="value">{selectedShape.type}</span>
            </div>

            <div className="key">
              x{"  "}
              <input
                className="value"
                name="x"
                type="text"
                value={selectedShape.x}
                onChange={(event) => updateAttr(event, selectedShape.type)}
                />
              
            </div>

            <div className="key">
              y{"  "}
              <input
                className="value"
                name="y"
                type="text"
                value={selectedShape.y}
                onChange={updateAttr}
                />
              
            </div>

            <div className="key">
              angle{"  "}
              <input
                className="value"
                name="rotation"
                type="text"
                value={selectedShape.rotation}
                onChange={updateAttr}
                />
              
            </div>

            <div className="key">
              Texture{" "}
            </div>
            <Select options={
              getTextureOptions(selectedShape.type)
            } 
            onChange={updateTexture}
            />
          </>
        ) : (
          <div className="no-data">Nothing is selected</div>
        )}
      </div>
    </aside>
  );
}
