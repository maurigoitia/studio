
"use client";

import React, { useEffect, useState } from 'react';

interface GoogleMapDisplayProps {
  latitude: number;
  longitude: number;
}

const MAP_ID = "DEMO_MAP_ID"; // Using a demo map ID for simplicity

const GoogleMapDisplay: React.FC<GoogleMapDisplayProps> = ({ latitude, longitude }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      // console.error("Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env file."); // Removed this line
      return;
    }

    if (window.google && window.google.maps && window.google.maps.WebComponents) {
      setScriptLoaded(true);
      return;
    }

    const scriptId = "google-maps-script";
    if (document.getElementById(scriptId)) {
      // Check if script is already loaded or loading
      if (window.google && window.google.maps && window.google.maps.WebComponents) {
         setScriptLoaded(true);
      }
      return;
    }
    
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&v=beta&callback=initMapGoogleWebComponents`;
    script.async = true;
    script.defer = true;
    
    // The callback function needs to be globally accessible
    window.initMapGoogleWebComponents = () => {
      console.log("Google Maps Web Components script loaded and callback executed.");
      setScriptLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      // Clean up the global callback function
      delete window.initMapGoogleWebComponents;
      // Optionally remove the script if the component unmounts,
      // though for Maps API it's often fine to leave it.
    };
  }, []);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="p-4 border border-destructive rounded-md bg-destructive/10 text-destructive">
        <p className="font-semibold">Error de Configuración del Mapa</p>
        <p>La clave API de Google Maps no está configurada. El mapa no se puede mostrar.</p>
        <p className="text-sm mt-2">Por favor, asegúrate de que `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` esté definida en tu archivo .env.</p>
      </div>
    );
  }

  if (!scriptLoaded) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted rounded-md">
        <p>Cargando mapa...</p>
      </div>
    );
  }

  const centerString = `${latitude},${longitude}`;

  return (
    <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md my-4">
      <gmp-map
        center={centerString}
        zoom="15"
        map-id={MAP_ID}
        style={{ height: '100%', width: '100%' }}
      >
        <gmp-advanced-marker
          position={centerString}
          title="Tu ubicación actual"
        ></gmp-advanced-marker>
      </gmp-map>
    </div>
  );
};

// Add this to avoid TypeScript errors for the global callback
declare global {
  interface Window {
    initMapGoogleWebComponents?: () => void;
    google?: any; // Basic type for google namespace
  }
}

export default GoogleMapDisplay;
