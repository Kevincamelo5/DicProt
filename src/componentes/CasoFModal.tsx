import React, { useState, useEffect } from "react";
import "../StyleGeneral/Modal.css";
import RelacionManager from "./RelacionManager.tsx";
import { Caso} from "./Objects.tsx";

// CasoFModal.tsx
interface CasoFModalProps {
  isOpen: boolean;
  onClose: () => void;
  caso?: Caso;
  onSave: (updatedCaso: Caso) => void;
  onCasoDelete: (id: number) => void;
  allObjects: Caso[]; // Filtrado para solo casos
  relations?: {
    relaciones: { targetId: number; text: string }[]
  };}

const CasoModal: React.FC<CasoFModalProps> = ({ isOpen, onClose, caso, onSave,onCasoDelete, allObjects, relations,}) => {
  if(!isOpen || !caso) return null;

  // En CasoModal.tsx (similar para Caso)
  const [formData, setFormData] = useState<Caso>({
    id: caso.id,
    name: caso.name,
    description: caso.description || "",
    vision: caso.vision || "tipo 0",
    isUniqueView: caso.isUniqueView || false,
    relaciones: relations?.relaciones || [],
    type: "caso",
  });

  useEffect(() => {
    if (caso) {
      setFormData({
        id: caso.id,
        name: caso.name,
        description: caso.description || "",
        vision: caso.vision || "tipo 0",
        isUniqueView: caso.isUniqueView || false,
        relaciones: relations?.relaciones || [],
        type: "caso",
      });
    }
  }, [caso, relations]);

  // manejar cambios de los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

/// Manejar cambios en las relaciones
  const handleRelationChange = (newRelations: { targetId: number; text: string }[]) => {
    setFormData((prevData) => ({ ...prevData, relaciones: newRelations }));
  };

  //manejar el envio del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); //envia los datos actualizados al componente padre
    onClose(); //cierra el modal
  };


  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el caso "${caso.name}"?`)) {
      onCasoDelete(caso.id);
      onClose(); // Cerrar el modal después de eliminar
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-close-button-container" onClick={onClose}>
          <button type='button' onClick={(e) =>{
            e.stopPropagation();
            onClose();
          }} className="close-button"
          >X</button>
        </div>
        <h2 className="modal-title">{formData.name}</h2>
        <form onSubmit={handleSubmit}>

          {/* Campo nombre altamente editable*/}
          <div className="form-field">
            <label>Nombre:</label>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e)=>
            setFormData({
              ...formData,
              name: e.target.value.toLowerCase()
            })}
            required/>
          </div>

          <div className="form-field">
            <label>Descripcion:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">

            <h4>Llama a...</h4>
            <RelacionManager
              objects={allObjects}
              selectedIds={formData.relaciones.map((r) => r.targetId)}
              onChange={handleRelationChange}
              initialRelations={formData.relaciones.reduce(
                (acc, rel) => ({ ...acc, [rel.targetId]: rel.text }),
                {}
              )}
            />
          </div>
          {/*Botones*/}
          <div className="modal-buttons">
            <button
              type="button"
              onClick={handleDelete}
              className="delete-button"
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CasoModal;