import mapboxgl from "mapbox-gl";
import { useRef, useEffect, useState } from "react";

import styles from "./map.module.css";

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
    
  },[lng,zoom,lat]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  },[]);

  return (
    <div id="map" className={styles["map"]}>
      <ul className={styles["sidebar"]}>
        <li>Longitude: <span>{lng}</span> </li>
        <li>Latitude: <span>{lat}</span> </li>
        <li>Zoom: <span>{zoom}</span></li>
      </ul>
      <div ref={mapContainer} className={styles["map-container"]} />
    </div>
  );
};
