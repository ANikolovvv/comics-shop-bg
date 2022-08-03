import mapboxgl from "mapbox-gl"; 
import { useRef, useEffect, useState } from "react";
import styles from "./Map.module.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid2hpdGVhbiIsImEiOiJjbDZkdTU0bzMwMXBiM2JvcmZtY2VoYnlvIn0.v-KwAt6HjcVliOLWOotd5A";

export const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(27.4667);
  const [lat, setLat] = useState(42.5007);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  return (
    <div className={styles["map"]}>
      <div className={styles["sidebar"]}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className={styles["map-container"]} />
    
    </div>
  );
};
