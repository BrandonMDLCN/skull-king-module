import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import GanadorModal from "./GanadorModal";

const Configuracion = ({ maxRondas, setMaxRondas, juegoIniciado, rondaActual, jugadores, nuevoJuego }) => {
  const [modalAbierto, setModalAbierto] = useState(true);
  const finalizoJuego = rondaActual === maxRondas;
  // Sincronización para que no se abra solo al cargar la página
  useEffect(() => {
    if (finalizoJuego) {
      setModalAbierto(true);
    }
  }, [finalizoJuego]); // Solo se dispara cuando el valor de finalizoJuego cambia a true

  // Obtenemos los ganadores
  const obtenerGanadores = () => {
    const maxPuntos = Math.max(...jugadores.map(j => j.puntos));
    return jugadores.filter(j => j.puntos === maxPuntos);
  };

  // Lógica para el mensaje de aviso
  const getMensajeMultiplicador = () => {
    if (rondaActual === maxRondas) return "🏁 JUEGO TERMINADO";

    const siguiente = rondaActual + 1;
    if (siguiente === maxRondas) return "⚠️ ¡ÚLTIMA RONDA! PUNTOS x3";
    if (siguiente === maxRondas - 1) return "🔥 ¡PENÚLTIMA RONDA! PUNTOS x2";
    return "Ronda Estándar (x1)";
  };
  
  const getMensajeRondas = () => {
    if (rondaActual !== maxRondas) {
      return `Ronda ${rondaActual+1} de ${maxRondas}`;
    }
    let ganadores = jugadores.filter(j => j.puntos === Math.max(...jugadores.map(j => j.puntos)));
    if (ganadores.length > 1) {
      return `¡Empate entre: ${ganadores.map(g => g.nombre).join(', ')}!`;
    }
    return `Ganador: ${ganadores[0].nombre}!`;
  };

  return (
    <div className="card config-card">
      <h2>Configuración</h2>
      <div className="rondas-config">
        <label className={juegoIniciado ? "disabled" : ""}>
          <input
            type="radio"
            name="rondas"
            value={5}
            checked={maxRondas === 5}
            onChange={() => setMaxRondas(5)}
            disabled={juegoIniciado}
          />{" "}
          5 Rondas
        </label>
        <label className={juegoIniciado ? "disabled" : ""}>
          <input
            type="radio"
            name="rondas"
            value={10}
            checked={maxRondas === 10}
            onChange={() => setMaxRondas(10)}
            disabled={juegoIniciado}
          />{" "}
          10 Rondas
        </label>
      </div>
      <div className="ronda-badge">
        <strong>{getMensajeRondas()}</strong>
      </div>
      {/* MENSAJE DE MULTIPLICADOR */}
      <div
        className={`multiplicador-aviso ${
          rondaActual + 1 >= maxRondas - 1 ? "animar" : ""
        }`}
      >
        {getMensajeMultiplicador()}
      </div>
      {/* Solo mostramos el modal si el juego terminó y el modal está marcado como abierto */}
      {finalizoJuego && modalAbierto && (
        <GanadorModal 
          ganadores={obtenerGanadores()} 
          alCerrar={() => setModalAbierto(false)}
          nuevoJuego={nuevoJuego}
        />
      )}
    </div>
  );
};

export default Configuracion;

Configuracion.propTypes = {
  maxRondas: PropTypes.number.isRequired,
  setMaxRondas: PropTypes.func.isRequired,
  juegoIniciado: PropTypes.bool.isRequired,
  rondaActual: PropTypes.number.isRequired,
  jugadores: PropTypes.array.isRequired,
  nuevoJuego: PropTypes.func.isRequired
};