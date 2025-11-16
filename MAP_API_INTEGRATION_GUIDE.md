# Map API Integration Guide

This guide explains how to replace the static SVG world map in the Hero section with a real, interactive map using Mapbox or Google Maps API.

## 🗺️ Current Implementation

The current map is a static SVG illustration in `src/components/Hero/Hero.jsx`. It shows animated dots representing impact locations but is not interactive.

## 📋 Prerequisites

Before integrating a map API, you'll need:

1. **API Key** from your chosen provider:
   - [Mapbox](https://www.mapbox.com/) - Free tier available
   - [Google Maps](https://developers.google.com/maps) - Free tier available
   - [Leaflet](https://leafletjs.com/) - Open source, no API key needed

2. **Node packages** for the map library

## 🚀 Option 1: Mapbox Integration (Recommended)

### Step 1: Get Mapbox API Key

1. Sign up at [mapbox.com](https://www.mapbox.com/)
2. Go to Account → Access Tokens
3. Copy your default public token or create a new one

### Step 2: Install Mapbox GL

```bash
npm install mapbox-gl
```

### Step 3: Add Mapbox CSS

Add to `index.html` in the `<head>`:

```html
<link href='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css' rel='stylesheet' />
```

### Step 4: Create Environment Variable

Create `.env` file in root:

```env
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

Add `.env` to `.gitignore`:

```
.env
.env.local
```

### Step 5: Update Hero Component

Replace the SVG map in `src/components/Hero/Hero.jsx`:

```jsx
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Hero.css';

const Hero = ({ onJoinClick }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark theme
      center: [78.9629, 20.5937], // Center on India
      zoom: 3,
      interactive: false, // Disable interaction for hero
    });

    // Add impact markers
    const impactLocations = [
      { lng: 77.2090, lat: 28.6139, city: 'Delhi' },
      { lng: 72.8777, lat: 19.0760, city: 'Mumbai' },
      { lng: 88.3639, lat: 22.5726, city: 'Kolkata' },
      { lng: 77.5946, lat: 12.9716, city: 'Bangalore' },
      { lng: 78.4867, lat: 17.3850, city: 'Hyderabad' },
      { lng: 73.8567, lat: 18.5204, city: 'Pune' },
    ];

    impactLocations.forEach((location) => {
      // Create custom marker
      const el = document.createElement('div');
      el.className = 'map-marker';
      el.style.width = '12px';
      el.style.height = '12px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = '#40e0d0';
      el.style.border = '2px solid #fff';
      el.style.boxShadow = '0 0 10px rgba(64, 224, 208, 0.6)';
      el.style.animation = 'pulse 2s ease-in-out infinite';

      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .addTo(map.current);

      markers.current.push(marker);
    });

    // Cleanup
    return () => {
      markers.current.forEach(marker => marker.remove());
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <section className="hero">
      {/* ... existing hero content ... */}
      
      <div className="hero-map" ref={mapContainer}>
        <p className="map-label">Live Impact Worldwide</p>
      </div>
    </section>
  );
};
```

### Step 6: Update Hero CSS

Add to `src/components/Hero/Hero.css`:

```css
.hero-map {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 400px; /* Set fixed height */
  overflow: hidden;
}

.hero-map .mapboxgl-map {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-md);
}

.map-marker {
  cursor: pointer;
}
```

## 🗺️ Option 2: Google Maps Integration

### Step 1: Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Maps JavaScript API"
4. Create credentials (API Key)
5. Restrict API key to your domain (recommended)

### Step 2: Install Google Maps Package

```bash
npm install @react-google-maps/api
```

### Step 3: Create Environment Variable

Add to `.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Step 4: Update Hero Component

```jsx
import { useLoadScript } from '@react-google-maps/api';
import { GoogleMap, Marker } from '@react-google-maps/api';

const Hero = ({ onJoinClick }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: 'var(--radius-md)',
  };

  const center = {
    lat: 20.5937,
    lng: 78.9629,
  };

  const impactLocations = [
    { lat: 28.6139, lng: 77.2090, city: 'Delhi' },
    { lat: 19.0760, lng: 72.8777, city: 'Mumbai' },
    // ... more locations
  ];

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <section className="hero">
      {/* ... existing content ... */}
      
      <div className="hero-map">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={5}
          options={{
            disableDefaultUI: true,
            zoomControl: false,
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#1e3a5f' }],
              },
              // Add more custom styles
            ],
          }}
        >
          {impactLocations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                url: 'data:image/svg+xml;base64,...', // Custom marker SVG
                scaledSize: new window.google.maps.Size(12, 12),
              }}
            />
          ))}
        </GoogleMap>
        <p className="map-label">Live Impact Worldwide</p>
      </div>
    </section>
  );
};
```

## 🍃 Option 3: Leaflet (Open Source, No API Key)

### Step 1: Install Leaflet

```bash
npm install leaflet react-leaflet
```

### Step 2: Add Leaflet CSS

In `src/main.jsx` or `index.html`:

```jsx
import 'leaflet/dist/leaflet.css';
```

### Step 3: Update Hero Component

```jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Hero = ({ onJoinClick }) => {
  const impactLocations = [
    { lat: 28.6139, lng: 77.2090, city: 'Delhi' },
    // ... more locations
  ];

  return (
    <section className="hero">
      {/* ... existing content ... */}
      
      <div className="hero-map">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: '400px', width: '100%', borderRadius: 'var(--radius-md)' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {impactLocations.map((location, index) => (
            <Marker key={index} position={[location.lat, location.lng]}>
              <Popup>{location.city}</Popup>
            </Marker>
          ))}
        </MapContainer>
        <p className="map-label">Live Impact Worldwide</p>
      </div>
    </section>
  );
};
```

## 📍 Adding Real-Time Data Markers

### Connect to Backend API

1. **Create API endpoint** that returns impact locations:

```javascript
// Example API response
{
  "locations": [
    {
      "lat": 28.6139,
      "lng": 77.2090,
      "city": "Delhi",
      "impact": {
        "meals": 5000,
        "volunteers": 200,
        "ngos": 15
      }
    }
  ]
}
```

2. **Fetch data in Hero component**:

```jsx
const [impactLocations, setImpactLocations] = useState([]);

useEffect(() => {
  const fetchImpactData = async () => {
    try {
      const response = await fetch('https://api.yourdomain.com/impact-locations');
      const data = await response.json();
      setImpactLocations(data.locations);
    } catch (error) {
      console.error('Error fetching impact data:', error);
    }
  };

  fetchImpactData();
  // Refresh every 5 minutes
  const interval = setInterval(fetchImpactData, 5 * 60 * 1000);
  return () => clearInterval(interval);
}, []);
```

3. **Update markers** when data changes:

```jsx
useEffect(() => {
  if (!map.current || impactLocations.length === 0) return;

  // Clear existing markers
  markers.current.forEach(marker => marker.remove());
  markers.current = [];

  // Add new markers
  impactLocations.forEach((location) => {
    const marker = new mapboxgl.Marker(createMarkerElement(location))
      .setLngLat([location.lng, location.lat])
      .setPopup(new mapboxgl.Popup().setHTML(createPopupHTML(location)))
      .addTo(map.current);
    
    markers.current.push(marker);
  });
}, [impactLocations]);
```

## 🎨 Customizing Map Appearance

### Mapbox Styles

Choose from Mapbox styles or create custom:

```jsx
style: 'mapbox://styles/mapbox/dark-v11', // Dark
style: 'mapbox://styles/mapbox/light-v11', // Light
style: 'mapbox://styles/mapbox/satellite-v9', // Satellite
```

### Custom Map Styles

Create custom styles in Mapbox Studio or use JSON:

```jsx
style: {
  version: 8,
  sources: { /* your sources */ },
  layers: [ /* your layers */ ]
}
```

## 🔒 Security Best Practices

1. **Restrict API Keys**:
   - Mapbox: Set URL restrictions
   - Google Maps: Set HTTP referrer restrictions

2. **Use Environment Variables**:
   - Never commit API keys to Git
   - Use `.env` files (already in `.gitignore`)

3. **Rate Limiting**:
   - Monitor API usage
   - Implement caching for location data

## 🧪 Testing

1. **Test in development**:
```bash
npm run dev
```

2. **Verify markers appear** at correct locations

3. **Test responsive design** on mobile devices

4. **Check API quota** usage

## 📊 Performance Optimization

1. **Limit marker count** (show only active/important locations)

2. **Cluster markers** for better performance:

```bash
npm install @mapbox/mapbox-gl-cluster
```

3. **Lazy load map** (only load when section is visible)

4. **Use static images** for simple use cases instead of full map

## 🆘 Troubleshooting

### Map Not Loading

- Check API key is correct
- Verify API key restrictions allow your domain
- Check browser console for errors
- Verify network requests in DevTools

### Markers Not Showing

- Check coordinates are valid (lat: -90 to 90, lng: -180 to 180)
- Verify marker creation code
- Check z-index and CSS styling

### Performance Issues

- Reduce number of markers
- Use marker clustering
- Optimize map style complexity

---

For more help, see [BUILD_GUIDE.md](./BUILD_GUIDE.md) or [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md).

