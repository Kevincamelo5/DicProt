import { useState, useEffect, useRef } from 'react';

export const IrrigationDashboardTemplate = () => {
    const colorPalette = ["#4885fe", "#008024", "#fafa8f", "#ff0000"];
    const [gridColors, setGridColors] = useState<string[]>(
        Array(16).fill(null).map(() =>
            colorPalette[Math.floor(Math.random() * colorPalette.length)]
        )
    );

    // Estado para el temporizador
    const [nextUpdate, setNextUpdate] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(true);
    const timerRef = useRef<number | null>(null);

    // Generar tiempo aleatorio entre min y max segundos
    const getRandomTime = (min: number = 1, max: number = 10) => {
        return Math.floor(Math.random() * (max - min + 1)) * 1000;
    };

    // Actualizar una celda aleatoria con nuevo color (simula cambio de sensor)
    const updateRandomCell = () => {
        const randomIndex = Math.floor(Math.random() * 16);
        const newColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];

        setGridColors(prev => {
            const nuevoGrid = [...prev];
            nuevoGrid[randomIndex] = newColor;
            return nuevoGrid;
        });

        return randomIndex;
    };

    // Configurar el ciclo de actualización con tiempo aleatorio
    useEffect(() => {
        if (!isRunning) return;

        const scheduleNextUpdate = () => {
            const delay = getRandomTime(1, 10);
            setNextUpdate(delay / 1000); // Mostrar en segundos

            timerRef.current = setTimeout(() => {
                updateRandomCell();
                scheduleNextUpdate(); // Programar siguiente actualización recursivamente
            }, delay);
        };

        scheduleNextUpdate();

        // Cleanup: limpiar timer al desmontar o cambiar isRunning
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isRunning]);

    // Countdown visual para el próximo update
    useEffect(() => {
        if (!isRunning || nextUpdate <= 0) return;

        const countdown = setInterval(() => {
            setNextUpdate(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(countdown);
    }, [isRunning, nextUpdate]);

    const apagarAsp = (index: number) => {
        if (confirm("¿Confirmar apagado de los aspersores?")) {
            actualizarColorCelda(index, "#008024");
        }
    };

    const encenderAsp = (index: number) => {
        if (confirm("¿Confirmar encendido de los aspersores?")) {
            actualizarColorCelda(index, "#4885fe");
        }
    };

    const actualizarColorCelda = (index: number, nuevoColor: string) => {
        setGridColors(prev => {
            const nuevoGrid = [...prev];
            nuevoGrid[index] = nuevoColor;
            return nuevoGrid;
        });
    };

    const handleCellClick = (index: number, colorActual: string) => {
        if (colorActual === "#008024") {
            alert("✅ La humedad del suelo es perfecta. Activar las bombas ahora podría ahogar el cultivo.");
        } else if (colorActual === "#4885fe") {
            apagarAsp(index);
        } else if (colorActual === "#fafa8f") {
            alert("⚠️ Humedad moderada. Monitorear zona.");
        } else if (colorActual === "#ff0000") {
            encenderAsp(index);
        }
    };

    const renderCell = (index: number) => {
        const color = gridColors[index];
        return (
            <td
                key={index}
                onClick={() => handleCellClick(index, color)}
                style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: color,
                    border: '2px solid #333',
                    cursor: isRunning ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                    opacity: isRunning ? 1 : 0.7
                }}
                onMouseOver={(e) => isRunning && (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                title={`Zona ${index + 1} - ${getColorLabel(color)}`}
            />
        );
    };

    // Helper para mostrar etiqueta del color
    const getColorLabel = (color: string) => {
        const labels: Record<string, string> = {
            "#4885fe": "🔵 Riego activo",
            "#008024": "🟢 Óptimo",
            "#fafa8f": "🟡 Moderado",
            "#ff0000": "🔴 Crítico"
        };
        return labels[color] || "Desconocido";
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', justifyContent: "center" }}>
            <h3>🌾 Hectáreas de terreno - Sistema de Riego</h3>

            {/* Panel de control del temporizador */}
            <div style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
                marginBottom: '15px',
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
            }}>
                <div style={{ fontSize: '14px' }}>
                    <strong>🔄 Actualización automática:</strong> {isRunning ? 'ACTIVA' : 'PAUSADA'}
                </div>
                <div style={{
                    padding: '5px 12px',
                    backgroundColor: '#4885fe',
                    color: 'white',
                    borderRadius: '15px',
                    fontSize: '14px',
                    minWidth: '100px',
                    textAlign: 'center'
                }}>
                    {isRunning ? `⏱️ ${nextUpdate}s` : '⏸️ Pausado'}
                </div>
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: isRunning ? '#ff9800' : '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {isRunning ? '⏸️ Pausar' : '▶️ Reanudar'}
                </button>
                <button
                    onClick={() => {
                        // Forzar actualización inmediata
                        updateRandomCell();
                        setNextUpdate(getRandomTime(1, 10) / 1000);
                    }}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#9c27b0',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    🔄 Actualizar ahora
                </button>
            </div>

            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                <strong>Leyenda:</strong>
                <span style={{ color: '#4885fe', margin: '0 5px' }}> 🔵 Riego</span> |
                <span style={{ color: '#008024', margin: '0 5px' }}> 🟢 Óptimo</span> |
                <span style={{ color: '#fafa8f', margin: '0 5px' }}> 🟡 Moderado</span> |
                <span style={{ color: '#ff0000', margin: '0 5px' }}> 🔴 Crítico</span>
            </p>

            <table style={{ borderCollapse: 'collapse', margin: '20px 0' }}>
                <tbody>
                    {Array.from({ length: 4 }, (_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: 4 }, (_, colIndex) => {
                                const index = rowIndex * 4 + colIndex;
                                return renderCell(index);
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Log de actividad (opcional) */}
            <div style={{
                fontSize: '12px',
                color: '#888',
                marginTop: '10px',
                fontStyle: 'italic'
            }}>
                💡 Los sensores se actualizan aleatoriamente cada 1-10 segundos
            </div>
        </div>
    );
};