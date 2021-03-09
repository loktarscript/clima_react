import api from '../keys';
import './main.css'
import React, { useState } from 'react'

export const WeatherInfo = () => {
    const [query, setQuery] = useState('');
    const [clima, setClima] = useState({});

    const busqueda = evt => {
        console.log(`${api.base_path}weather?q=${query}&units=metric&APPID=${api.key}`)
        if (evt.key === "Enter") {
            fetch(`${api.base_path}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setClima(result);
                    setQuery('');
                    console.log(result);
                });
        }
    };

    const dateBuilder = (d) => {
        let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

        let dia = dias[d.getDay()];
        let fecha = d.getDate();
        let mes = meses[d.getMonth()];
        let anio = d.getFullYear();

        return `${dia} ${fecha} ${mes} ${anio}`;
    };

    return (
        <div className={
            (typeof clima.main !== 'undefined')
                ? ((clima.main.temp < 9)
                    ? 'weather warm' : 'weather')
                : 'weather'}>
            <main>
                <div className="search-box col align-self-center">
                    <div class="mb-3 row">
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="search-bar form-control"
                                placeholder="Búsqueda..."
                                onChange={e => setQuery(e.target.value)}
                                value={query}
                                onKeyPress={busqueda}
                            />
                        </div>
                    </div>
                </div>
                {(typeof clima.main !== 'undefined') ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{clima.name}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temperatura">
                                {Math.round(clima.main.temp)} °C
                    </div>
                            <div className="mi-ciela">
                                {clima.weather[0].main}
                            </div>
                        </div>
                    </div>
                ) : ('')}
            </main>
        </div>
    );
}
