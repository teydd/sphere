import React, { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import axios from "axios";
import Nav from "../components/Nav";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

const WeatherGlobe = () => {
  const { isAuthenticated, user } = useAuthStore();
  const globeRef = useRef();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const globeInstance = useRef(null);
  const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const globe = Globe()(globeRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-day.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .showAtmosphere(true);

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.6;

    globeInstance.current = globe;

    const baseLocations = [
      { city: "New York", lat: 40.7128, lng: -74.006 },
      { city: "London", lat: 51.5074, lng: -0.1278 },
    ];

    const fetchWeather = async () => {
      try {
        const responses = await Promise.all(
          baseLocations.map((loc) =>
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lng}&units=metric&appid=${apiKey}`,
              { withCredentials: false }
            )
          )
        );

        const weatherData = responses.map((res, i) => ({
          ...baseLocations[i],
          temp: `${Math.round(res.data.main.temp)}°C`,
          feels: `${Math.round(res.data.main.feels_like)}°C`,
          humidity: `${res.data.main.humidity}%`,
          condition: res.data.weather[0].description,
        }));

        setCities(weatherData);

        globe
          .pointsData(weatherData)
          .pointAltitude(0.2)
          .pointRadius(0.6)
          .pointColor(() => "orange")
          .pointLabel((d) => `${d.city}: ${d.temp}`);

        globe
          .labelsData(weatherData)
          .labelLat((d) => d.lat)
          .labelLng((d) => d.lng)
          .labelText((d) => `${d.city} ${d.temp}`)
          .labelSize(1.5)
          .labelColor(() => "yellow")
          .labelAltitude(0.2);

        globe.onPointClick((city) => {
          setSelectedCity(city);
          globe.pointOfView(
            { lat: city.lat, lng: city.lng, altitude: 1.5 },
            2000
          );
        });
      } catch (err) {
        console.error("Error fetching base weather:", err);
      }
    };

    fetchWeather();

    // ✅ Auto-detect user location on load
    if (isAuthenticated && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          try {
            const geoRes = await axios.get(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`,
              { withCredentials: false }
            );
            const cityName = geoRes.data[0]?.name || "My Location";
            await fetchCityWeather(lat, lon, cityName);
          } catch (err) {
            console.error("Reverse geocoding error:", err.message);
            await fetchCityWeather(lat, lon, "My Location");
          }
        },
        (err) => console.error("Location error:", err.message)
      );
    }
  }, [isAuthenticated]);

  // suggestions
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`,
        { withCredentials: false }
      );
      setSuggestions(res.data);
    } catch (err) {
      console.error("Suggestion error:", err.message);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchCity(value);
    fetchSuggestions(value);
  };

  const handleSelectCity = async (city) => {
    await fetchCityWeather(city.lat, city.lon, city.name);
    setSearchCity("");
    setSuggestions([]);
  };

  // ✅ central weather fetcher
  const fetchCityWeather = async (lat, lon, customName = null) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
        { withCredentials: false }
      );

      const cityWeather = {
        city: customName || res.data.name,
        lat: res.data.coord.lat,
        lng: res.data.coord.lon,
        temp: `${Math.round(res.data.main.temp)}°C`,
        feels: `${Math.round(res.data.main.feels_like)}°C`,
        humidity: `${res.data.main.humidity}%`,
        condition: res.data.weather[0].description,
      };

      setCities((prev) => {
        const updated = [...prev, cityWeather];
        globeInstance.current.pointsData(updated);
        globeInstance.current.labelsData(updated);
        globeInstance.current.pointOfView(
          { lat: cityWeather.lat, lng: cityWeather.lng, altitude: 1.5 },
          2000
        );
        return updated;
      });

      setSelectedCity(cityWeather);
    } catch (err) {
      console.error("City fetch error:", err.message);
    }
  };

  const handleSearchSubmit = async () => {
    if (!searchCity.trim()) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${apiKey}`,
        { withCredentials: false }
      );
      if (res.data.length > 0) {
        const city = res.data[0];
        await fetchCityWeather(city.lat, city.lon, city.name);
        setSearchCity("");
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Search submit error:", err.message);
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          try {
            const geoRes = await axios.get(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`,
              { withCredentials: false }
            );
            const cityName = geoRes.data[0]?.name || "My Location";
            await fetchCityWeather(lat, lon, cityName);
          } catch (err) {
            console.error("Reverse geocoding error:", err.message);
            await fetchCityWeather(lat, lon, "My Location");
          }
        },
        (err) => console.error("Location error:", err.message)
      );
    } else {
      alert("Geolocation not supported by your browser.");
    }
  };

  return (
    <div
      className=""
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      <div
        className=""
        ref={globeRef}
        style={{ width: "100%", height: "100%", background: "black" }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1,
        }}
      >
        <Nav />
      </div>

      {isAuthenticated && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            width: "260px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              width: "260px",
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              <input
                className="form-control"
                type="text"
                placeholder="Search city..."
                value={searchCity}
                onChange={handleChange}
              />
              <button onClick={handleSearchSubmit} className="btn btn-info">
                Search
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  background: "white",
                  border: "1px solid #ccc",
                  maxHeight: "150px",
                  overflowY: "auto",
                  position: "absolute",
                  width: "100%",
                  zIndex: 3,
                }}
              >
                {suggestions.map((city, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelectCity(city)}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {city.name}, {city.country}
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={handleUseMyLocation}
              className="btn btn-outline-light align-items-center justify-content-center w-100 m-1"
            >
              Use My Location
            </button>
          </div>
        </div>
      )}

      {selectedCity && isAuthenticated && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "1rem",
            borderRadius: "8px",
            zIndex: 2,
            width: "300px",
            textAlign: "center",
          }}
        >
          <h2>{selectedCity.city}</h2>
          <p>🌡 Temperature: {selectedCity.temp}</p>
          <p>🤔 Feels Like: {selectedCity.feels}</p>
          <p>💧 Humidity: {selectedCity.humidity}</p>
          <p>☁ Condition: {selectedCity.condition}</p>
          <ul className="d-flex ">
            <li className="nav-link">
              <button
                className="btn btn-outline-danger m-1"
                onClick={() => setSelectedCity(null)}
              >
                Close
              </button>
            </li>
            <li className="nav-link">
              <Link to={"/dasboard"} className="btn btn-outline-light m-1">
                More infromation
              </Link>
            </li>
          </ul>
        </div>
      )}
      {!isAuthenticated && (
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "1rem",
            borderRadius: "8px",
            zIndex: 2,
            width: "300px",
            textAlign: "center",
          }}
        >
          <p>🔒 Please sign in to view weather from your location.</p>
        </div>
      )}
    </div>
  );
};

export default WeatherGlobe;
