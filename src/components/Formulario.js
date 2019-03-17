import React, { Component } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';


class Formulario extends Component {
    state = {
        criptomonedas: [],
        moneda: '',
        criptomoneda: '',
        error: false
    };

    async componentWillMount() {
        const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

        await axios.get(url)
            .then(respuesta => {
                this.setState({
                    criptomonedas: respuesta.data.Data
                });
            });
    };


    // Obtener el valor cada vez que ocurra un cambio en la seleccion del combo.
    obtenerValor = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    // Validar que el usuario elija las monedas
    cotizarMoneda = e => {
        e.preventDefault();

        //Validar que haya algo en el state
        const {moneda, criptomoneda} = this.state;
        if (moneda === '' || criptomoneda === '') {
            this.setState({
                error: true
            }, () => {
                setTimeout( () => {
                    this.setState({error: false});
                },3000);
            });
            return;
        }

        // Craer el objeto
        const cotizacion = {moneda, criptomoneda};

        // Enviar los datos al componente App.js para cotizar
        this.props.cotizarCriptomoneda(cotizacion);
    }

    render() { 
        const mensaje = (this.state.error) ? <Error mensaje = 'Ambos campos son obligatorios' /> : '';
        return (
            <form onSubmit={this.cotizarMoneda}>
                {mensaje}
                <div className="row">
                    <label>Elige tu Moneda</label>
                    <select
                        onChange={this.obtenerValor}
                        name="moneda"
                        className="u-full-width">
                            <option value="">Elige tu Criptomoneda</option>
                            <option value="CRC">Colón Costarricense</option>
                            <option value="USD">Dolar Estadounidense</option>
                            <option value="CAD">Dolar Canadiense</option>
                            <option value="MXN">Peso Mexicano</option>
                            <option value="GBP">Libras</option>
                            <option value="EUR">Euros</option>
                    </select>
                </div>

                <div className="row">
                <div>
                    <label>Elige tu Criptomoneda</label>
                    <select 
                        onChange={this.obtenerValor}
                        name="criptomoneda" 
                        className="u-full-width">
                            <option value="">Elige tu moneda</option>
                            {Object.keys(this.state.criptomonedas).map(key => (
                                <Criptomoneda
                                    key={key}
                                    criptomoneda={this.state.criptomonedas[key]}
                                />
                            ))}
                    </select>
                </div>
                </div>
                <input className="button-primary u-full-width" type="submit" value="Cotizar" />
            </form>
        );
    }
}
 
export default Formulario;