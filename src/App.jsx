import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=e16ee4c364f04d56904173836221508&q=${city}&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setWeatherForecast(data);
      });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#top">
          Previsão do Tempo
        </a>
      </nav>
      <main className="container">
        <div className="jumbotron">
          <h1> Verifique a previsão do tempo da sua cidade!</h1>
          <p className="lead">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em
            pesquisar
          </p>
          <div className="row mb-4">
            <div className="col-md-6">
              <input
                onChange={handleChange}
                className="form-control"
                value={city}
              />
            </div>
          </div>
          <button onClick={handleSearch} className=" btn btn-primary btn-lg">
            Pesquisar
          </button>
          {weatherForecast ? (
            <div>
              <div className="mt-4 d-flex align-items-center">
                <div>
                  <p className="lead">
                    Hoje o dia está: {weatherForecast.current.condition.text}
                  </p>
                  <p className="lead">
                    Temperatura: {weatherForecast.current.temp_c} C
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
