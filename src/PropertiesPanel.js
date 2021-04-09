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

const shapeSelector = (state) => state.shapes[state.selected];

export function PropertiesPanel() {
const options_shape1 = [
        { value: "tile1", label: <img src={Shape11} height="60px" width="60px"/> },
        { value: 'tile2', label: <img src={Shape12} height="60px" width="60px"/>  },
      ]
  const selectedShape = useShapes(shapeSelector);

  const updateAttr = useCallback((event) => {
    const attr = event.target.name;

    updateAttribute(attr, event.target.value);
  }, []);

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
              Texture{" "}
              {/* <input
                className="value"
                name="Texture"
                type="color"
                value={selectedShape.fill}
                onChange={updateAttr} */}
              
            </div>
            <Select options={options_shape1} />
          </>
        ) : (
          <div className="no-data">Nothing is selected</div>
        )}
      </div>
    </aside>
  );
}
