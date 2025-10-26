import React, { useState, useEffect } from "react";
import "../StyleGeneral/Modal.css";
import RelacionManager from "./RelacionManager.tsx";
import { Actor} from "./Objects.tsx";

// ActorFModal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  actor?: Actor;
  onSave: (updatedActor: Actor) => void;
  onActorDelete: (id: number) => void;
  allObjects: Actor[]; // Filtrado para solo actores
  relations?: {
    relaciones: { targetId: number; text: string }[]
  };}

const ActorModal: React.FC<ModalProps> = ({ isOpen, onClose, actor,onSave, onActorDelete, allObjects, relations }) => {
  if (!isOpen || !actor) return null; // No renderizar si el modal no está abierto o no hay actor

  const [formData, setFormData] = useState<Actor>({
    id: actor.id,
    name: actor.name,
    relaciones: relations?.relaciones || [],
    type: "actor",
  });

  useEffect(() => {
    if(actor){
      setFormData({
        id:actor.id,
        name: actor.name,
        relaciones: relations?.relaciones || [],
        type: "actor",
      });
    }
  }, [actor, relations]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRelationChange = (newRelations: { targetId: number; text: string }[]) => {
    setFormData((prevData) => ({ ...prevData, relaciones: newRelations }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Enviar los datos actualizados al componente padre
    onClose(); // Cerrar el modal después de guardar
  };

  const handleDelete = () => {
    if(window.confirm('¿Estas seguro que deseseas eliminar a "${actor.name}"?')) {
      onActorDelete(actor.id);
      onClose();
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-close-button-container" onClick={onClose}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="close-button"
          >
            X
          </button>
        </div>
        <h2 className='modal-title'>Editar Detalles del Actor</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo Nombre (editable) */}
          <div className="form-field">
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
.
          {/* gestor de relaciones*/}
          <div className="form-field">

            <h4>Llama a...</h4>
            <RelacionManager
              objects={allObjects}
              selectedIds={formData.relaciones.map((r) => r.targetId)}
              onChange={handleRelationChange}
            />
          </div>

          {/* Botones */}
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
  );
};

export default ActorModal;