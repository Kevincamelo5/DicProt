import React, { useState } from "react";
import "../StyleGeneral/Modal.css";
import "../StyleGeneral/AcercaDe.css";
interface AcercaDeProps {
  isOpen: boolean;
  onClose: () => void;
}

const AcercaDe: React.FC<AcercaDeProps> = ({ isOpen, onClose }) => {
  // Estado para controlar el índice del carrusel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Textos del carrusel
  const carouselTexts = [
    "Saludos, esta herramienta busca ser un apoyo para la formación de mejores requisitos en base a una comprensión obtenida por un referente visual.",
    "Esta herramienta permite la generación de los casos de uso y actores mediante botones que contienen las representaciones de estos.",
    "Los casos de uso son representaciones de funcionalidades posibles dentro de acciones posibles dentro del sistema.",
    "Los prototipos generados, se construyen en base a los casos de uso, funcionan como una versión base predefinida.",
    "¡Esperamos que disfrutes usando esta aplicación!",
  ];

  // Función para avanzar al siguiente texto
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselTexts.length);
  };

  // Función para retroceder al texto anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselTexts.length - 1 : prevIndex - 1
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Acerca de</h2>
        <button onClick={onClose} className="close-button">
          cerrar
        </button>
        <div className="carousel">
          <button onClick={prevSlide} className="carousel-buttonLeft">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="96.60631578947368" viewBox="0 0 475 717"><path fill="#0284c7" d="m227 357l246 246l-119 114L0 363L362 0l113 112z"/></svg>
          </button>
          <div className="carousel-text">
            {carouselTexts[currentIndex]}
          </div>
          <button onClick={nextSlide} className="carousel-buttonRigt">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="96.60631578947368" viewBox="0 0 475 717"><path fill="#0284c7" d="M248 361L2 115L121 0l354 355l-363 362L0 606z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;