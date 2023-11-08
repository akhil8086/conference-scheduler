


import  { useEffect, useState } from 'react';
import Header from './Header';

function LocationInfoPage() {
  const [locationData, setLocationData] = useState({});
  const API_KEY = 'b3fbd9f320e34e88b0ecf55baf826e5b';

  useEffect(() => {
    const getLocationData = async () => {
      try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=San+Francisco&key=${API_KEY}`);
        const data = await response.json();
        if (data.results.length > 0) {
          setLocationData(data.results[0].geometry);
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    getLocationData();
  }, [API_KEY]);

  return (
    <div className="text-center">
      <Header />
      <h2 className="text-3xl font-bold mt-4">Location Information</h2>

      <div id="map" className="my-8" style={{ height: '400px', width: '100%' }}>
        {locationData.lat && locationData.lng && (
          <iframe
            width="100%"
            height="400"
            style={{ border: 0 }}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${locationData.lng - 0.01},${locationData.lat - 0.01},${locationData.lng + 0.01},${locationData.lat + 0.01}&layer=mapnik&marker=${locationData.lat},${locationData.lng}`}
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default LocationInfoPage;

