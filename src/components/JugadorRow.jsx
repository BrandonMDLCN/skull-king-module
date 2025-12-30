import PropTypes from "prop-types";

const JugadorRow = ({ j, actualizarJugador }) => {
    return (
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
                        min="0"
                        step="1"
                        value={j.apuestaHecha} 
                        onChange={(e) => actualizarJugador(j.id, 'apuestaHecha', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="number" className="input-number"
                        min="0"
                        step="1"
                        value={j.apuestaGanada} 
                        onChange={(e) => actualizarJugador(j.id, 'apuestaGanada', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="number" className="input-number"
                        min="0"
                        step="1"
                        value={j.puntosExtra} 
                        onChange={(e) => actualizarJugador(j.id, 'puntosExtra', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="number" className="input-number"
                        min="-2"
                        max="2"
                        step="1"
                        value={j.efectoPirata} 
                        onChange={(e) => actualizarJugador(j.id, 'efectoPirata', e.target.value)}
                      />
                    </td>
                  </tr>
    )
}

export default JugadorRow;

JugadorRow.propTypes = {
    j: PropTypes.object.isRequired,
    actualizarJugador: PropTypes.func.isRequired
}