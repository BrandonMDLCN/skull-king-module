import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import InfoNote from './components/info-note';
import Configuracion from './components/Configuracion';
import JugadorRow from './components/JugadorRow';
import GanadorModal from './components/GanadorModal';

function App() {
  const [maxRondas, setMaxRondas] = useState(5);
  const [rondaActual, setRondaActual] = useState(0);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [jugadores, setJugadores] = useState([
    { id: 1, nombre: '', puntos: 0, apuestaHecha: 0, apuestaGanada: 0, puntosExtra: 0 , efectoPirata: 0}
  ]);
  const [historialRondas, setHistorialRondas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(true);

  const finalizoJuego = rondaActual === maxRondas;
  // Sincronización para que no se abra solo al cargar la página
  useEffect(() => {
    if (finalizoJuego) {
      setModalAbierto(true);
    }
  }, [finalizoJuego]); // Solo se dispara cuando el valor de finalizoJuego cambia a true

  const nuevoJuego = () => {
    if (window.confirm("¿Reiniciar la travesía, capitán?")) {
      setRondaActual(0);
      setJuegoIniciado(false);
      setHistorialRondas([]);
      setJugadores([
        {
          id: 1,
          nombre: "",
          puntos: 0,
          apuestaHecha: 0,
          apuestaGanada: 0,
          puntosExtra: 0,
          efectoPirata: 0,
        },
      ]);
    }
  };

  const agregarJugador = () => {
    setJugadores([...jugadores, { 
      id: Date.now(), nombre: '', puntos: 0, apuestaHecha: 0, apuestaGanada: 0, puntosExtra: 0, efectoPirata: 0 
    }]);
  };

  const actualizarJugador = (id, campo, valor) => {
    const nuevosJugadores = jugadores.map(j => 
      j.id === id ? { ...j, [campo]: valor } : j
    );
    setJugadores(nuevosJugadores);
  };

  const obtenerGanadores = () => {
    const maxPuntos = Math.max(...jugadores.map(j => j.puntos));
    return jugadores.filter(j => j.puntos === maxPuntos);
  };

  return (
    <div className="skull-king-theme">
      {finalizoJuego && modalAbierto && (
        <GanadorModal 
          ganadores={obtenerGanadores()} 
          alCerrar={() => setModalAbierto(false)}
          nuevoJuego={nuevoJuego}
        />
      )}
      <Header setRondaActual={setRondaActual} setJuegoIniciado={setJuegoIniciado} setJugadores={setJugadores} jugadores={jugadores} rondaActual={rondaActual} maxRondas={maxRondas} historialRondas={historialRondas} setHistorialRondas={setHistorialRondas} nuevoJuego={nuevoJuego}/>

      <div className="game-container">
        {/* PANEL IZQUIERDO: CONFIG Y NOTAS */}
        <aside className="side-panel">
          <Configuracion juegoIniciado={juegoIniciado} maxRondas={maxRondas} setMaxRondas={setMaxRondas} jugadores={jugadores} rondaActual={rondaActual} nuevoJuego={nuevoJuego}/>
          <InfoNote />
        </aside>

        {/* PANEL DERECHO: JUGADORES */}
        <main className="main-panel">
          <div className="card table-card">
            <div className="table-header">
              <h2>Tripulación</h2>
              <button className="btn-small" onClick={agregarJugador}>+ Reclutar Pirata</button>
            </div>
            <div className="table-responsive-container">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Puntos (x10)</th>
                    <th>Apuesta</th>
                    <th>Ganadas</th>
                    <th>Extra</th>
                    <th>Efecto Pirata</th>
                  </tr>
                </thead>
                <tbody>
                  {jugadores.map((j, index) => (
                    <JugadorRow key={j.id} j={j} actualizarJugador={actualizarJugador} esUltimo={index === jugadores.length - 1}/>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div><br/>
      <div className="card historial-footer">
        <h3>Historial de Travesías</h3>
        <div className="historial-entries">
          {/* Creamos una copia y la invertimos para mostrar la más reciente arriba */}
          {[...historialRondas].reverse().map((ronda, index) => (
            <div key={ronda.numero} className="historial-entry animate-fade-in">
              <div className="ronda-badge">Ronda {ronda.numero}</div>
              {ronda.datos.map((det, i) => (
                <div key={i} className="historial-item">
                  <strong>{det.nombre || 'Pirata Anónimo'}</strong> 
                  <span> | Puntos Totales: {det.puntos * 10} </span>
                  <span className={det.puntosGanados >= 0 ? 'puntos-positivos' : 'puntos-negativos'}>
                    | Ganados: {det.puntosGanados > 0 ? `+${det.puntosGanados}` : det.puntosGanados} pts
                  </span>
                  <br />
                  <small>(Apostó: {det.apuesta} | Ganó: {det.ganada} | Extra: {det.puntosExtra} | Efecto: {det.efectoPirata})</small>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;