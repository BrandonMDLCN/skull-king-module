import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import InfoNote from './components/info-note';
import Configuracion from './components/Configuracion';
import JugadorRow from './components/JugadorRow';

function App() {
  const [maxRondas, setMaxRondas] = useState(5);
  const [rondaActual, setRondaActual] = useState(0);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [jugadores, setJugadores] = useState([
    { id: 1, nombre: '', puntos: 0, apuestaHecha: 0, apuestaGanada: 0, puntosExtra: 0 , efectoPirata: 0}
  ]);

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

  return (
    <div className="skull-king-theme">
      <Header setRondaActual={setRondaActual} setJuegoIniciado={setJuegoIniciado} setJugadores={setJugadores} jugadores={jugadores} rondaActual={rondaActual} maxRondas={maxRondas}/>

      <div className="game-container">
        {/* PANEL IZQUIERDO: CONFIG Y NOTAS */}
        <aside className="side-panel">
          <Configuracion juegoIniciado={juegoIniciado} maxRondas={maxRondas} setMaxRondas={setMaxRondas} jugadores={jugadores} rondaActual={rondaActual}/>
          <InfoNote />
        </aside>

        {/* PANEL DERECHO: JUGADORES */}
        <main className="main-panel">
          <div className="card table-card">
            <div className="table-header">
              <h2>Tripulación</h2>
              <button className="btn-small" onClick={agregarJugador}>+ Reclutar Pirata</button>
            </div>
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
                {jugadores.map((j) => (
                  <JugadorRow key={j.id} j={j} actualizarJugador={actualizarJugador} />
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;