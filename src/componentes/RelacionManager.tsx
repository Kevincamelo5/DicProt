// RelacionManager.tsx
import React, { useState } from "react";
import { MyObject } from "./Objects.tsx";

interface RelationManagerProps {
  objects: MyObject[];
  onChange: (newRelations: { targetId: number; text: string }[]) => void;
  selectedObject?: MyObject;
  selectedIds: number[];
  initialRelations?: Record<number, string>; // Para inicializar los valores de texto
}

const RelacionManager: React.FC<RelationManagerProps> = ({
                                                           objects,
                                                           onChange,
                                                           selectedIds,
                                                           initialRelations = {},
                                                         }) => {
  const [selected, setSelected] = useState<number[]>(selectedIds);
  const [relationInputs] = useState<Record<number, string>>(initialRelations);

  const handleSelectChange = (id: number) => {
    setSelected((prev) => {
      const index = prev.indexOf(id);
      if (index === -1) {
        return [...prev, id];
      } else {
        return prev.filter((itemId) => itemId !== id);
      }
    });
  };

  /*const handleTextChange = (id: number, text: string) => {
    setRelationInputs((prev) => ({ ...prev, [id]: text }));
  };*/

  const handleSave = () => {
    const newRelations = selected.map((id) => ({
      targetId: id,
      text: relationInputs[id] || "Extend", // Usa el texto ingresado o "Extende" por defecto
    }));
    onChange(newRelations);
  };

  return (
    <div>
      <ul>
        {objects.map((obj) => (
          <li key={obj.id}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(obj.id)}
                onChange={() => handleSelectChange(obj.id)}
              />
              {obj.name}
            </label>
          </li>
        ))}
      </ul>
      <div className="relation-save-container">
        <button onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
};

export default RelacionManager;