import React, { Component } from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

class App extends Component {

  state = {
    resultado: {},
    monedaSeleccionada: '',
    criptoSeleccionada: '',
    cargando: false
  }

  cotizarCriptomoneda = async (cotizacion) => {
    // Obtener los valores
    const {moneda, criptomoneda} = cotizacion;

    // Realizar consulta con axios a la API
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
                 
    await axios.get(url)
      .then(resp => {
        this.setState({
          resultado: resp.data.DISPLAY[criptomoneda][moneda],
          cargando: true
        }, () => {
          setTimeout(() => {
            this.setState({cargando: false});
          },1200);
        });
      });
  };

  render() {
    const resultado = (this.state.cargando) ? <Spinner /> : <Resultado resultado={this.state.resultado}/>;
    return (
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <img src={imagen} alt="imagen" className="logotipo" />
            <div id="autor">
              <p>
                Autor: <a href="https://wzamora.com/" target="_blank" rel="noopener noreferrer"><span>William Zamora V.</span></a>
              </p>
              
            </div>
          </div>
          <div className="one-half column">
            <h1>Cotizador de Criptomonedas</h1>
            <Formulario cotizarCriptomoneda = {this.cotizarCriptomoneda} />
            {resultado}
          </div>
        </div>
      </div>
    );
  }
}

export default App;


// fde3180563a72401dd4e6963dabbefc902110df541708434282717c0587e2e28

