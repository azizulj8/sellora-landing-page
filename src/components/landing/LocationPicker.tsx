import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons (Leaflet + bundlers)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export type LatLng = { lat: number; lng: number };

interface Props {
  value: LatLng | null;
  onChange: (v: LatLng) => void;
}

export function LocationPicker({ value, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const initial: LatLng = value ?? { lat: -6.2, lng: 106.816666 }; // Jakarta default

    const map = L.map(containerRef.current).setView([initial.lat, initial.lng], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([initial.lat, initial.lng], {
      icon: DefaultIcon,
      draggable: true,
    }).addTo(map);

    marker.on("dragend", () => {
      const { lat, lng } = marker.getLatLng();
      onChange({ lat, lng });
    });

    map.on("click", (e: L.LeafletMouseEvent) => {
      marker.setLatLng(e.latlng);
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value (e.g. geolocate button) to map
  useEffect(() => {
    if (!value || !mapRef.current || !markerRef.current) return;
    markerRef.current.setLatLng([value.lat, value.lng]);
    mapRef.current.setView([value.lat, value.lng], 15);
  }, [value?.lat, value?.lng]);

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => onChange({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="h-72 w-full rounded-lg border border-border overflow-hidden z-0"
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {value
            ? `Pin: ${value.lat.toFixed(5)}, ${value.lng.toFixed(5)}`
            : "Klik peta atau geser pin untuk pilih lokasi"}
        </span>
        <button
          type="button"
          onClick={useMyLocation}
          className="text-primary hover:underline font-medium"
        >
          Gunakan lokasi saya
        </button>
      </div>
    </div>
  );
}
