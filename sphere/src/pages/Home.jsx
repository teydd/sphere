import React, { useEffect, useRef, useState } from "react";
import Globe from "globe.gl";
import axios from "axios";
import Nav from "../components/Nav";

const WeatherGlobe = () => {
  const globeRef = useRef();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null); // ✅ new

  useEffect(() => {
    const globe = Globe()(globeRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-day.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .showAtmosphere(true);

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.6;

    const fetchWeather = async () => {
      const apiKey = "f19c8e0752f1f0c473b30272644f7833"; // ✅ wrap in quotes

      const locations = [
        { city: "New York", lat: 40.7128, lng: -74.006 },
        { city: "London", lat: 51.5074, lng: -0.1278 },
        { city: "Nairobi", lat: -1.2921, lng: 36.8219 },
      ];

      try {
        const responses = await Promise.all(
          locations.map((loc) =>
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lng}&units=metric&appid=${apiKey}`
            )
          )
        );

        const weatherData = responses.map((res, i) => ({
          ...locations[i],
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

        // ✅ make cities clickable
        globe.onPointClick(setSelectedCity);
      } catch (err) {
        console.error("Error fetching weather:", err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* 🌍 Globe */}
      <div
        ref={globeRef}
        style={{ width: "100%", height: "100%", background: "black" }}
      />

      {/* ✅ Navbar Overlay */}
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

      {/* ✅ Popup for selected city */}
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
