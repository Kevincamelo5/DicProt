import React, { useState, useEffect, useRef } from 'react';
import {
    Droplets, Thermometer, Wind, CloudRain, AlertTriangle,
    Tractor, Sprout, Activity, MapPin, Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- DATOS DE EJEMPLO (Mock Data) ---
const mockWeather = { temp: 28, humidity: 65, wind: 12, rainProb: 10 };
const mockTankLevel = 78; // Porcentaje

const mockChartData = [
    { time: '06:00', humedad: 45, temp: 18 },
    { time: '09:00', humedad: 40, temp: 22 },
    { time: '12:00', humedad: 32, temp: 28 },
    { time: '15:00', humedad: 28, temp: 31 },
    { time: '18:00', humedad: 35, temp: 26 },
    { time: '21:00', humedad: 42, temp: 20 },
];

const mockAlerts = [
    { id: 1, type: 'critical', msg: 'Zona 4: Humedad del suelo en nivel crítico (< 20%)', time: 'Hace 15 min' },
    { id: 2, type: 'warning', msg: 'Bomba principal: Mantenimiento preventivo pendiente', time: 'Hace 2 horas' },
    { id: 3, type: 'info', msg: 'Riego programado para Zona 1 a las 05:00 AM', time: 'Hace 5 horas' },
];

export const MonitorTemplate = () => {
    // Estado para simular la cuadrícula de zonas (heredado de tu idea anterior)
    const [zones] = useState([
        { id: 1, name: 'Zona A1', status: 'optimal', moisture: 65 },
        { id: 2, name: 'Zona A2', status: 'optimal', moisture: 70 },
        { id: 3, name: 'Zona B1', status: 'warning', moisture: 35 },
        { id: 4, name: 'Zona B2', status: 'critical', moisture: 15 },
    ]);

    // Colores según estado
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'optimal': return '#008024'; // Verde
            case 'warning': return '#fafa8f'; // Amarillo
            case 'critical': return '#ff0000'; // Rojo
            case 'irrigating': return '#4885fe'; // Azul
            default: return '#ccc';
        }
    };

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh', padding: '20px', color: '#333' }}>

            {/* 1. ENCABEZADO */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Sprout size={28} color="#008024" />
                        AgroMonitor Pro - Finca "El Roble"
                    </h1>
                    <p style={{ margin: '5px 0 0', color: '#666', fontSize: '14px' }}>
                        Última actualización: {new Date().toLocaleString()}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '15px', backgroundColor: 'white', padding: '10px 20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                    <div style={{ textAlign: 'center' }}><Thermometer size={20} color="#ff6b6b" /><div style={{ fontSize: '12px', fontWeight: 'bold' }}>{mockWeather.temp}°C</div></div>
                    <div style={{ textAlign: 'center' }}><Droplets size={20} color="#4885fe" /><div style={{ fontSize: '12px', fontWeight: 'bold' }}>{mockWeather.humidity}%</div></div>
                    <div style={{ textAlign: 'center' }}><Wind size={20} color="#888" /><div style={{ fontSize: '12px', fontWeight: 'bold' }}>{mockWeather.wind} km/h</div></div>
                    <div style={{ textAlign: 'center' }}><CloudRain size={20} color="#4885fe" /><div style={{ fontSize: '12px', fontWeight: 'bold' }}>{mockWeather.rainProb}%</div></div>
                </div>
            </header>

            {/* 2. TARJETAS DE MÉTRICAS CLAVE (KPIs) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                <KpiCard Icon={Droplets} title="Nivel Tanque Principal" value={`${mockTankLevel}%`} color="#4885fe" subtext="Capacidad: 10,000 L" />
                <KpiCard Icon={Activity} title="Humedad Promedio" value="42%" color="#008024" subtext="Dentro del rango óptimo" />
                <KpiCard Icon={AlertTriangle} title="Alertas Activas" value="2" color="#ff0000" subtext="1 crítica, 1 advertencia" />
                <KpiCard Icon={Tractor} title="Maquinaria" value="3/4" color="#f59e0b" subtext="1 en mantenimiento" />
            </div>

            {/* 3. CONTENIDO PRINCIPAL: GRÁFICO + MAPA DE ZONAS */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '25px' }}>

                {/* Gráfico de Tendencias */}
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={18} /> Tendencia de Humedad del Suelo (Últimas 24h)
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={mockChartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="humedad" stroke="#008024" strokeWidth={3} dot={{ r: 4 }} name="Humedad (%)" />
                            <Line type="monotone" dataKey="temp" stroke="#ff6b6b" strokeWidth={2} dot={{ r: 4 }} name="Temp (°C)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Mapa de Zonas (Tu cuadrícula 4x4 adaptada) */}
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={18} /> Estado por Zonas
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        {zones.map((zone) => (
                            <div
                                key={zone.id}
                                style={{
                                    padding: '15px',
                                    borderRadius: '8px',
                                    backgroundColor: getStatusColor(zone.status) + '20', // 20 = opacidad en hex
                                    borderLeft: `4px solid ${getStatusColor(zone.status)}`,
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{zone.name}</div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: getStatusColor(zone.status), margin: '5px 0' }}>
                                    {zone.moisture}%
                                </div>
                                <div style={{ fontSize: '12px', color: '#666', textTransform: 'capitalize' }}>
                                    {zone.status === 'optimal' ? '✅ Óptimo' : zone.status === 'warning' ? '⚠️ Moderado' : '🚨 Crítico'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. PANEL DE ALERTAS Y EVENTOS */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={18} /> Registro de Eventos Recientes
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {mockAlerts.map((alert) => (
                        <div key={alert.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            padding: '12px',
                            backgroundColor: alert.type === 'critical' ? '#ffebee' : alert.type === 'warning' ? '#fff8e1' : '#e3f2fd',
                            borderRadius: '8px',
                            borderLeft: `4px solid ${alert.type === 'critical' ? '#ff0000' : alert.type === 'warning' ? '#f59e0b' : '#4885fe'}`
                        }}>
                            <AlertTriangle size={20} color={alert.type === 'critical' ? '#ff0000' : alert.type === 'warning' ? '#f59e0b' : '#4885fe'} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{alert.msg}</div>
                            </div>
                            <div style={{ fontSize: '12px', color: '#666', whiteSpace: 'nowrap' }}>{alert.time}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

// Componente auxiliar para las tarjetas KPI
const KpiCard = ({ Icon, title, value, color, subtext }: { Icon: React.ElementType, title: string, value: string, color: string, subtext: string }) => (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ backgroundColor: color + '20', padding: '12px', borderRadius: '10px', color: color }}>
            <Icon size={24} />
        </div>
        <div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{value}</div>
            <div style={{ fontSize: '12px', color: color, fontWeight: '500' }}>{subtext}</div>
        </div>
    </div>
);

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