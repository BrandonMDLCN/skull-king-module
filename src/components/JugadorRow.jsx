import PropTypes from "prop-types";

const JugadorRow = ({ j, actualizarJugador }) => {
  return (
    <tr key={j.id}>
      <td>
        <input
          type="text"
          className="input-pirate"
          placeholder="Nombre"
          value={j.nombre}
          onChange={(e) => actualizarJugador(j.id, "nombre", e.target.value)}
        />
      </td>


      <td className="score-cell">{j.puntos * 10}</td>


      <td className="control-apuesta">
        <div className="control-container">
          {/* Botón de Restar */}
          <button
            className="btn-control"
            onClick={() => {
              const actual = Number.parseInt(j.apuestaHecha || 0);
              if (actual > 0) {
                actualizarJugador(j.id, "apuestaHecha", actual - 1);
              }
            }}
          >
            -
          </button>

          <input
            type="number"
            className="input-number"
            min="0"
            step="1"
            value={j.apuestaHecha}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || (/^\d+$/.test(val) && Number.parseInt(val) >= 0)) {
                actualizarJugador(j.id, "apuestaHecha", val);
              }
            }}
            style={{ width: "50px", textAlign: "center" }} // Estilo básico para centrar
          />

          {/* Botón de Sumar */}
          <button
            className="btn-control"
            onClick={() => {
              const actual = Number.parseInt(j.apuestaHecha || 0);
              actualizarJugador(j.id, "apuestaHecha", actual + 1);
            }}
          >
            +
          </button>
        </div>
      </td>


      <td className="control-ganadas">
        <div className="control-container">
          {/* Botón de Restar */}
          <button
            className="btn-control"
            onClick={() => {
              const actual = Number.parseInt(j.apuestaGanada || 0);
              if (actual > 0) {
                actualizarJugador(j.id, "apuestaGanada", actual - 1);
              }
            }}
          >
            -
          </button>

          <input
            type="number"
            className="input-number"
            min="0"
            step="1"
            value={j.apuestaGanada}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || (/^\d+$/.test(val) && Number.parseInt(val) >= 0)) {
                actualizarJugador(j.id, "apuestaGanada", val);
              }
            }}
            style={{ width: "50px", textAlign: "center" }} // Estilo básico para centrar
          />

          {/* Botón de Sumar */}
          <button
            className="btn-control"
            onClick={() => {
              const actual = Number.parseInt(j.apuestaGanada || 0);
              actualizarJugador(j.id, "apuestaGanada", actual + 1);
            }}
          >
            +
          </button>
        </div>
      </td>


      <td className="control-extras">
        <div className="control-container">
          {/* Botón de Restar */}
          <button
            className="btn-control"
            onClick={() => {
              const actual = Number.parseInt(j.puntosExtra || 0);
              if (actual > 0) {
                actualizarJugador(j.id, "puntosExtra", actual - 1);
              }
            }}
          >
            -
          </button>

          <input
            type="number"
            className="input-number"
            min="0"
            step="1"
            value={j.puntosExtra}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || (/^\d+$/.test(val) && Number.parseInt(val) >= 0)) {
                actualizarJugador(j.id, "puntosExtra", val);
              }
            }}
            style={{ width: "50px", textAlign: "center" }} // Estilo básico para centrar
          />

          {/* Botón de Sumar */}
          <button
            className="btn-control"
            onClick={() => {
              const actual = Number.parseInt(j.puntosExtra || 0);
              actualizarJugador(j.id, "puntosExtra", actual + 1);
            }}
          >
            +
          </button>
        </div>
      </td>
      <td className="control-pirata">
        <div className="control-container">
          {/* Botón de Restar */}
          <button
            className="btn-control"
            onClick={() => {
              const actual = Number.parseInt(j.efectoPirata || 0);
              if (actual > -2) {
                actualizarJugador(j.id, "efectoPirata", actual - 1);
              }
            }}
          >
            -
          </button>

          <input
            type="number"
            className="input-number"
            min="-2"
            max="2"
            step="1"
            value={j.efectoPirata}
            onChange={(e) =>
              actualizarJugador(j.id, "efectoPirata", e.target.value)
            }
          />
          {/* Botón de Sumar */}
          <button
            className="btn-control"
            onClick={() => {
              const actual = Number.parseInt(j.efectoPirata || 0);
              actualizarJugador(j.id, "efectoPirata", actual + 1);
            }}
          >
            +
          </button>
        </div>
      </td>
    </tr>
  );
};

export default JugadorRow;

JugadorRow.propTypes = {
  j: PropTypes.object.isRequired,
  actualizarJugador: PropTypes.func.isRequired,
};
