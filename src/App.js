import './App.css';
import { useState } from 'react';

function App() {
  const [maxRondas, setMaxRondas] = useState(5);
  const [rondaActual, setRondaActual] = useState(0);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [jugadores, setJugadores] = useState([
    { id: 1, nombre: '', puntos: 0, apuestaHecha: 0, apuestaGanada: 0, puntosExtra: 0 }
  ]);

  const nuevoJuego = () => {
    if (window.confirm("¿Reiniciar la travesía, capitán?")) {
      setRondaActual(0);
      setJuegoIniciado(false);
      setJugadores([{ id: 1, nombre: '', puntos: 0, apuestaHecha: 0, apuestaGanada: 0, puntosExtra: 0 }]);
    }
  };

  const agregarJugador = () => {
    setJugadores([...jugadores, { 
      id: Date.now(), nombre: '', puntos: 0, apuestaHecha: 0, apuestaGanada: 0, puntosExtra: 0 
    }]);
  };

  const actualizarJugador = (id, campo, valor) => {
    const nuevosJugadores = jugadores.map(j => 
      j.id === id ? { ...j, [campo]: valor } : j
    );
    setJugadores(nuevosJugadores);
  };

  const siguienteRonda = () => {
    const listos = jugadores.every(j => j.nombre !== "");
    if (!listos) return alert("¡Por las barbas de Neptuno! Todos los piratas deben tener nombre.");

    setJuegoIniciado(true);
    if (rondaActual >= maxRondas) return alert("¡Tesoro encontrado! El juego ha terminado.");
    
    // DETERMINAR MULTIPLICADOR DE RONDA
    let multiplicadorRonda = 1;
    const proximaRondaNum = rondaActual + 1;

    if (proximaRondaNum === maxRondas) {
      multiplicadorRonda = 3; // Última ronda
    } else if (proximaRondaNum === maxRondas - 1) {
      multiplicadorRonda = 2; // Penúltima ronda
    }

    const nuevosPuntos = jugadores.map(j => {
      let puntosDeRonda = Number.parseInt(j.apuestaHecha) || 0;
      
      // Lógica de apuesta 0
      if(Number.parseInt(j.apuestaGanada || 0) === 0 && Number.parseInt(j.apuestaHecha || 0) === 0) {
        puntosDeRonda = 1; 
      } 
      // Si falla la apuesta, puntos negativos
      else if (Number.parseInt(j.apuestaHecha || 0) !== Number.parseInt(j.apuestaGanada || 0)) {
        puntosDeRonda = -Math.abs(puntosDeRonda);
      }

      // Aplicar multiplicador especial de la ronda (x2 o x3)
      const puntosCalculados = puntosDeRonda * multiplicadorRonda;

      return {
        ...j,
        puntos: j.puntos + puntosCalculados + Number.parseInt(j.puntosExtra || 0),
        apuestaHecha: 0,
        apuestaGanada: 0,
        puntosExtra: 0
      };
    });

    setJugadores(nuevosPuntos);
    setRondaActual(proximaRondaNum);
  };

  // Lógica para el mensaje de aviso
  const getMensajeMultiplicador = () => {
    if (rondaActual === maxRondas) return "🏁 JUEGO TERMINADO";

    const siguiente = rondaActual + 1;
    if (siguiente === maxRondas) return "⚠️ ¡ÚLTIMA RONDA! PUNTOS x3";
    if (siguiente === maxRondas - 1) return "🔥 ¡PENÚLTIMA RONDA! PUNTOS x2";
    return "Ronda Estándar (x1)";
  };

  return (
    <div className="skull-king-theme">
      <header className="main-header">
        <h1>SKULL KING ⚓</h1>
        <div className="header-buttons">
          <button className="btn-pirate" onClick={nuevoJuego}>Nuevo Juego</button>
          <button className="btn-pirate gold" onClick={siguienteRonda}>Siguiente Ronda</button>
        </div>
      </header>

      <div className="game-container">
        {/* PANEL IZQUIERDO: CONFIG Y NOTAS */}
        <aside className="side-panel">
          <div className="card config-card">
            <h2>Configuración</h2>
            <div className="rondas-config">
              <label className={juegoIniciado ? "disabled" : ""}>
                <input 
                  type="radio" name="rondas" value={5} 
                  checked={maxRondas === 5} 
                  onChange={() => setMaxRondas(5)}
                  disabled={juegoIniciado} 
                /> 5 Rondas
              </label>
              <label className={juegoIniciado ? "disabled" : ""}>
                <input 
                  type="radio" name="rondas" value={10} 
                  checked={maxRondas === 10} 
                  onChange={() => setMaxRondas(10)}
                  disabled={juegoIniciado} 
                /> 10 Rondas
              </label>
            </div>
            <div className="ronda-badge">
              <strong>{(rondaActual !== maxRondas) ? "RONDA" + (rondaActual+1) + "/" + maxRondas : "Juego Terminado"}</strong>
            </div>
            {/* MENSAJE DE MULTIPLICADOR */}
            <div className={`multiplicador-aviso ${rondaActual + 1 >= maxRondas - 1 ? 'animar' : ''}`}>
               {getMensajeMultiplicador()}
            </div>
          </div>

          <div className="card info-note">
            <h3>📜 Pergamino de Poderes</h3>
            <p><span className="p-red">●</span> <strong>Rojo:</strong> Cambia 2 cartas.</p>
            <p><span className="p-yellow">●</span> <strong>Amarillo:</strong> Todos toman 1 carga.</p>
            <p><span className="p-green">●</span> <strong>Verde:</strong> Apuesta +1 o -1.</p>
            <p><span className="p-blue">●</span> <strong>Azul:</strong> Apuesta Bonus (0, 10, 20).</p>
          </div>
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
                </tr>
              </thead>
              <tbody>
                {jugadores.map((j) => (
                  <tr key={j.id}>
                    <td>
                      <input 
                        type="text" className="input-pirate" placeholder="Nombre" 
                        value={j.nombre} 
                        onChange={(e) => actualizarJugador(j.id, 'nombre', e.target.value)}
                      />
                    </td>
                    <td className="score-cell">{(j.puntos * 10)}</td>
                    <td>
                      <input 
                        type="number" className="input-number"
                        value={j.apuestaHecha} 
                        onChange={(e) => actualizarJugador(j.id, 'apuestaHecha', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="number" className="input-number"
                        value={j.apuestaGanada} 
                        onChange={(e) => actualizarJugador(j.id, 'apuestaGanada', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="number" className="input-number"
                        value={j.puntosExtra} 
                        onChange={(e) => actualizarJugador(j.id, 'puntosExtra', e.target.value)}
                      />
                    </td>
                  </tr>
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