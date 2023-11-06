


import React, { useEffect, useState } from 'react';
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
    <div>
      <Header />
      <h2>Location Information</h2>
      <div id="map" style={{ height: '400px', width: '100%' }}>
        {locationData.lat && locationData.lng && (
          <iframe
            width="100%"
            height="400"
            // frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${locationData.lng - 0.01},${locationData.lat - 0.01},${locationData.lng + 0.01},${locationData.lat + 0.01}&layer=mapnik&marker=${locationData.lat},${locationData.lng}`}
          ></iframe>
        )}
      </div>
      <p>Our conference will be held at the following address:</p>
      <address className=''>
        San Francisco Convention Center<br />
        123 Conference Ave<br />
        San Francisco, CA 12345
      </address>
    </div>
  );
}

export default LocationInfoPage;
