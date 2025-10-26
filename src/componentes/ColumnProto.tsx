import React, { useState, useRef, useEffect } from "react";
import "../StyleGeneral/ColumnProto.css";
import ActorIcon from "../assets/Actor.svg";
import ActorModal from "./ActorFModal";
import CasoModal from "./CasoFModal";
import { Caso, Actor, MyObject } from "./Objects";

interface ColumnProtoProps {
  casos: Caso[];
  onCasoDelete: (id: number) => void;
  onCasoUpdate: (updatedCaso: Caso) => void;
  actors: Actor[];
  onActorDelete: (id: number) => void;
  onActorUpdate: (updatedActor: Actor) => void;
  allObjects: (Actor | Caso)[];
  relations: { [key: number]: { relaciones: { targetId: number; text: string }[] } };
  setRelations: React.Dispatch<
    React.SetStateAction<{ [key: number]: { relaciones: { targetId: number; text: string }[] } }>
  >;
}

const Sistema: React.FC<{ children: React.ReactNode; className?: string }> = ({
                                                                                children,
                                                                                className,
                                                                              }) => {
  return <div className={`sistema ${className || ""}`}>{children}</div>;
};

const ColumnProto: React.FC<ColumnProtoProps> = ({
                                                   casos,
                                                   onCasoDelete,
                                                   onCasoUpdate,
                                                   actors,
                                                   onActorDelete,
                                                   onActorUpdate,
                                                   allObjects,
                                                   relations,
                                                   setRelations,
                                                 }) => {
  const actorRefs = useRef<Record<number, HTMLDivElement>>({});
  const casoRefs = useRef<Record<number, HTMLDivElement>>({});
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [selectedCaso, setSelectedCaso] = useState<Caso | null>(null);
  const [isActorModalOpen, setIsActorModalOpen] = useState(false);
  const [isCasoModalOpen, setIsCasoModalOpen] = useState(false);
  const [, ForceUpdate ] = useState<boolean>(true);

  const openActorModal = (actor: Actor) => {
    setSelectedActor(actor);
    setIsActorModalOpen(true);
  };

  const closeActorModal = () => {
    setIsActorModalOpen(false);
    setSelectedActor(null);
  };

  const openCasoModal = (caso: Caso) => {
    setSelectedCaso(caso);
    setIsCasoModalOpen(true);
  };

  const closeCasoModal = () => {
    setIsCasoModalOpen(false);
    setSelectedCaso(null);
  };

  useEffect(() => {
    const updateConnections = () => {
      //funcion para recalcular las lineas
      ForceUpdate((prev) => !prev);
    }

    //Agregar listener para scroll y resize
    const container = document.querySelector(".scroll-container");
    if(container){
      container.addEventListener("scroll", updateConnections);
      window.addEventListener("resize", updateConnections);
    }

    //limpiar el listener al desmontar el componente
    return() => {
      if (container) {
        container.removeEventListener("scroll", updateConnections);
      }
      window.removeEventListener("resize", updateConnections);
    }
  }, []);

  // En la función handleTextClick
  const toggleRelationText = (sourceId: number, targetId: number, currentText: string) => {
    setRelations((prev) => {
      const newRelations = { ...prev };
      const sourceRelations = newRelations[sourceId]?.relaciones || [];

      // Buscar y actualizar la relación específica
      const updatedRelations = sourceRelations.map((rel) =>
        rel.targetId === targetId
          ? { ...rel, text: currentText === "Extend" ? "Include" : "Extend" }
          : rel
      );

      newRelations[sourceId] = { relaciones: updatedRelations };
      return newRelations;
    });
  };

  return (
    <div className="container-columns">
      {/* Columna de Actores */}
      <div className="scroll-container">
        <div className="column-content">
          {actors.map((actor) => (
            <div
              key={actor.id}
              // Cambiar a función con tipo explícito
              ref={(el: HTMLDivElement | null) => {
                if (el) actorRefs.current[actor.id] = el;
              }}
              className={`actor ${selectedActor?.id === actor.id ? "selected" : ""}`}
              onContextMenu={(e) =>{ e.preventDefault(); openActorModal(actor);}}
            >
              <img src={ActorIcon} alt="Actor" className="actor-icon" />
              <div className="actor-name">{actor.name}</div>
            </div>
          ))}
        </div>

        <Sistema className="sistema-casos">
          <div className="column-header">Sistema</div>
          <div className="column-content">
            {casos.map((caso) => (
              <div
                key={caso.id}
                // Cambiar a función con tipo explícito
                ref={(el: HTMLDivElement | null) => {
                  if (el) casoRefs.current[caso.id] = el;
                }}
                className={`caso ${selectedCaso?.id === caso.id ? "selected" : ""}`}
                onClick={() => onCasoUpdate(caso)}
                onContextMenu={(e) =>{ e.preventDefault(); openCasoModal(caso);}}
              >
                <div className="caso-name">{caso.name}</div>
              </div>
            ))}
          </div>
        </Sistema>
      </div>

      {/* Renderizado de conexiones SVG */}
      <svg className="connections-layer">
        {Object.entries(relations).flatMap(([sourceIdStr, { relaciones }]) => {
          const sourceId = parseInt(sourceIdStr, 10);
          return relaciones.map(({ targetId, text }, index) => {
            const sourceElement = actorRefs.current[sourceId] || casoRefs.current[sourceId];
            const targetElement = actorRefs.current[targetId] || casoRefs.current[targetId];

            if (!sourceElement || !targetElement) return null;

            const sourceRect = sourceElement.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();

            const svgContainer = document.querySelector(".connections-layer");
            const svgRect = svgContainer?.getBoundingClientRect();

            const OFFSET_STEP = 10;
            const offset = index * OFFSET_STEP;

            // Calcular las coordenadas de los bordes
            const deltaX = (targetRect.left + targetRect.width / 2) - (sourceRect.left + sourceRect.width / 2);
            const deltaY = (targetRect.top + targetRect.height / 2) - (sourceRect.top + sourceRect.height / 2);
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

// Normalizar el vector dirección
            const directionX = deltaX / distance;
            const directionY = deltaY / distance;

// Ajustar las coordenadas al borde del objeto
            const sourceEdgeX = (sourceRect.left + sourceRect.width / 2) + directionX * (sourceRect.width / 2);
            const sourceEdgeY = (sourceRect.top + sourceRect.height / 2) + directionY * (sourceRect.height / 2);
            const targetEdgeX = (targetRect.left + targetRect.width / 2) - directionX * (targetRect.width / 2);
            const targetEdgeY = (targetRect.top + targetRect.height / 2) - directionY * (targetRect.height / 2);

// Ajustar al sistema de coordenadas del SVG
            const adjustedSourceEdgeX = sourceEdgeX - (svgRect?.left || 0) + offset;
            const adjustedSourceEdgeY = sourceEdgeY - (svgRect?.top || 0);
            const adjustedTargetEdgeX = targetEdgeX - (svgRect?.left || 0) + offset;
            const adjustedTargetEdgeY = targetEdgeY - (svgRect?.top || 0);

            const isSolidLine =
              (sourceElement.classList.contains("actor") && targetElement.classList.contains("caso")) ||
              (sourceElement.classList.contains("actor") && targetElement.classList.contains("actor"));

            return (
              <g key={`${sourceId}-${targetId}-${index}`}>
                <line
                  x1={adjustedSourceEdgeX + offset}
                  y1={adjustedSourceEdgeY}
                  x2={adjustedTargetEdgeX}
                  y2={adjustedTargetEdgeY}
                  style={{
                    stroke: "black",
                    strokeWidth: 2,
                    strokeDasharray: isSolidLine? "none" : "10,5",
                  }}
                />
                { !isSolidLine && text && (

                  <text
                    x={(adjustedSourceEdgeX + adjustedTargetEdgeX) / 2}
                    y={(adjustedSourceEdgeY + adjustedTargetEdgeY) / 2}
                    textAnchor="middle"
                    onClick={() => toggleRelationText(sourceId, targetId, text)}
                    style={{ cursor: "pointer" }}
                  >
                    {text}
                  </text>
                )}

              </g>
            );
          });
        })}
      </svg>

      {/* Modales */}
      {isActorModalOpen && selectedActor && (
        <ActorModal
          isOpen={isActorModalOpen}
          onClose={closeActorModal}
          actor={selectedActor}
          onSave={onActorUpdate}
          onActorDelete={onActorDelete}
          allObjects={allObjects.filter((obj): obj is Actor => obj.id !== selectedActor.id)}
          relations={relations[selectedActor.id]}
        />
      )}

      {isCasoModalOpen && selectedCaso && (
        <CasoModal
          isOpen={isCasoModalOpen}
          onClose={closeCasoModal}
          caso={selectedCaso}
          onSave={onCasoUpdate}
          onCasoDelete={onCasoDelete}
          allObjects={allObjects.filter((obj): obj is Caso => obj.type === "caso" && obj.id !== selectedCaso.id)}
          relations={relations[selectedCaso.id]}
        />
      )}

    </div>
  );
};

export default ColumnProto;
