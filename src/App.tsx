//import React from 'react';
import ColumnProto from "./componentes/ColumnProto.tsx";
import IconActor from './assets/Actor.svg';
import IconCaso from './assets/CasoDeUso.svg';
import './App.css'
import React, { useState } from "react";
import WindPrt from "./componentes/Prototipo.tsx";
import { Actor, Caso} from "./componentes/Objects.tsx"
import AcercaDeComponent from "./componentes/AcercaDe.tsx";

interface ImportedData {
  meta: {
    version: string;
    createdAt: string;
    appName: string;
  };
  actors: Actor[];
  casos: Caso[];
  relations: {
    [key: number]: { relaciones: { targetId: number; text: string }[] };
  };
}

//nav list para importar y exportar
function LiImpExp({onExport, onImport}: {onExport: () => void; onImport: (importedData: ImportedData) => void}) {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>{
        try {
          const content = e.target?.result as string;
          const importedData = JSON.parse(content) as ImportedData;

          //validar estructura basica
          if(importedData.meta && importedData.actors && importedData.casos && importedData.relations) {
            onImport(importedData);
          } else {
            alert('El archivo no tiene el formato correcto (.pcu)');
          }
        } catch (error) {
          console.error('Error al importar:',error);
          alert('Error al procesar el archivo. Asegúrese de que es un archivo .pcu válido.')
        }
      };
      reader.readAsText(file);

      // Resetear el input para permitir volver a importar el mismo archivo
      event.target.value='';
    }
  };

  return (
    <nav>
      <ul>
        <li><input
          type="file"
          id="import-file"
          style={{display: 'none'}}
          accept=".pcu"
          onChange={handleFileInput}
        />
        <label htmlFor="import-file" className="import-label">Importar</label>
        </li>
        <li><button onClick={onExport} className="export-button">Exportar</button></li>
      </ul>
    </nav>
  );
}

const App: React.FC = ()=> {
  // Estado para almacenar los casos generados
  const [generatedCasos, setGeneratedCasos] = useState<Caso[]>([]);
  //Estado para almacenar los Actores
  const [generatedActors, setGeneratedActors] = useState<Actor[]>([]);
  //Estado para almacenar las relaciones entre objetos
  const [relations, setRelations] = useState<{
    [key: number]: { relaciones: { targetId: number; text: string }[] };
  }>({});
  const [currentView, setCurrentView] = useState<number | null>(null); // ✅ (si se usa)
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  //funcion para exportar los datos
  const exportData = () => {
    const data = {
      meta  : {
        version: '1.0',
        createdAt: new Date().toISOString(),
        appName:'Prototipo de Casos de Uso'
      },
      actors:  generatedActors,
      casos: generatedCasos,
      relations: relations
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
      a.download = `prototipo_${new Date().toISOString().replace(/[:/]/g, '-')}.pcu`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  //funcion para importar los datos
  const importData = (importedData: ImportedData) => {
    if (!window.confirm('¿Está seguro que desea importar este archivo? se perderán los cambios actuales.')){
      return;
    }

    setGeneratedActors(importedData.actors);
    setGeneratedCasos(importedData.casos);
    setRelations(importedData.relations);
    setCurrentView(null)
    alert("datos importados correctamente");
  };

  // Función para generar un nuevo caso
  const generateCaso = (): void =>{
    const newCaso: Caso = {
      id: Math.floor(Math.random() * 1000000),
      name: "caso",
      description: "",
      vision: "tipo 0",
      relaciones: [],
      type: "caso",
      isUniqueView: false,
    };
    setGeneratedCasos((prevCaso) => [...prevCaso, {...newCaso, type: "caso"}]);
  };


  const generateActor = (): void =>{
    const newActor: Actor = {
      id: Math.floor(Math.random() * 1000000),
      name: "Actor",
      relaciones: [],
      type: "actor",
    }
    setGeneratedActors((prevActor) => [...prevActor, {...newActor, type: "actor"}]);
  }

  // Eliminar caso
  const deleteCaso = (id: number) => {
    setGeneratedCasos((prev) => prev.filter((c) => c.id !== id));
    setRelations((prev) => {
      const updated = { ...prev };
      delete updated[id];
      Object.values(updated).forEach((rel) => {
        rel.relaciones = rel.relaciones.filter((r) => r.targetId !== id);
      });
      return updated;
    });
  };

// Eliminar actor
  const deleteActor = (id: number) => {
    setGeneratedActors((prev) => prev.filter((a) => a.id !== id));
    setRelations((prev) => {
      const updated = { ...prev };
      delete updated[id];
      Object.values(updated).forEach((rel) => {
        rel.relaciones = rel.relaciones.filter((r) => r.targetId !== id);
      });
      return updated;
    });
  };

  const onActorUpdate = (updatedActor: Actor) => {
    setGeneratedActors((prev) =>
      prev.map((a) => (a.id === updatedActor.id ? updatedActor : a))
    );
    const newRelations = updatedActor.relaciones.map(({ targetId, text }) => ({
      targetId,
      text: text || "Extend",
    }));
    updateRelations(updatedActor.id, newRelations);
  };

// Actualizar caso
  const onCasoUpdate = (updatedCaso: Caso) => {
    setGeneratedCasos((prev) =>
      prev.map((c) => (c.id === updatedCaso.id ? updatedCaso : c))
    );
    const newRelations = updatedCaso.relaciones.map(({ targetId, text }) => ({
      targetId,
      text: text || "Extend",
    }));
    updateRelations(updatedCaso.id, newRelations);

    // En onCasoUpdate (App.tsx)
    if (updatedCaso.isUniqueView) {
      setCurrentView(updatedCaso.id); // ✅ Actualiza el estado
    } else {
      setCurrentView(null);
    }
  };

  const updateRelations = (id: number, newRelations: { targetId: number; text: string }[]) => {
    setRelations((prev) => ({
      ...prev,
      [id]: { relaciones: newRelations },
    }));
  };


  return (
    //<>
    <div className="App">
      <header className="App-header">
        <div id="tooldiagramador">
          <button onClick={generateActor}><img src={IconActor} width={24} height={24}/></button>
          <button onClick={generateCaso}><img src={IconCaso} width ={24} height = {24} /></button>
        </div>

        < LiImpExp onExport={exportData} onImport={importData}/>
        <button type="button" onClick={() => setIsAboutOpen(true)}>?</button>
        <h1 className="App-title"></h1>
      </header>
      <section>
        <ColumnProto
          casos={generatedCasos}
          onCasoDelete={deleteCaso}
          onCasoUpdate={onCasoUpdate}
          actors={generatedActors}
          onActorDelete={deleteActor}
          onActorUpdate={onActorUpdate}
          allObjects={[...generatedCasos, ...generatedActors]}
          relations={relations}
          setRelations={setRelations}
        />
        <AcercaDeComponent isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        <div className="WindPrt" style={{}}>
            <WindPrt casos={generatedCasos} currentView={currentView} />
        </div>
      </section>
    </div>
    //</>
  )
}

export default App;
