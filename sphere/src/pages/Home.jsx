import React, { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import axios from "axios";
import Nav from "../components/Nav";

const WeatherGlobe = () => {
  const globeRef = useRef();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const globeInstance = useRef(null);
  const apiKey = "3a5b06bae7471ab88a0e3f647fac9e55"; // 🔑 replace with your OpenWeatherMap key

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
              `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lng}&units=metric&appid=${apiKey}`
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

    const fetchUserLocationWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          try {
            const res = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
            );

            const userWeather = {
              city: res.data.name || "Your Location",
              lat,
              lng,
              temp: `${Math.round(res.data.main.temp)}°C`,
              feels: `${Math.round(res.data.main.feels_like)}°C`,
              humidity: `${res.data.main.humidity}%`,
              condition: res.data.weather[0].description,
            };

            setCities((prev) => {
              const updated = [...prev, userWeather];
              globe.pointsData(updated);
              globe.labelsData(updated);

              globe.pointOfView({ lat, lng, altitude: 1.5 }, 2000);

              return updated;
            });
          } catch (err) {
            console.error(
              "User weather fetch error:",
              err.response?.data || err.message
            );
          }
        });
      }
    };

    fetchWeather().then(fetchUserLocationWeather);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchCity.trim()) return;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`
      );

      const cityWeather = {
        city: res.data.name,
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
      setSearchCity("");
    } catch (err) {
      console.error("Search city error:", err.response?.data || err.message);
    }
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
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

      <form
        onSubmit={handleSearch}
        style={{
          position: "absolute",
          top: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          gap: "8px",
        }}
      >
        <input
          type="text"
          placeholder="Search city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            background: "orange",
            color: "black",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {selectedCity && (
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
          <button
            onClick={() => setSelectedCity(null)}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              border: "none",
              borderRadius: "4px",
              background: "orange",
              color: "black",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherGlobe;
