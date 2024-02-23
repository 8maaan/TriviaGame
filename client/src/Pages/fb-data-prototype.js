import './App.css';
import React, { useEffect, useState } from 'react';
import { getFirebaseData } from './API-Services/firebaseAPI';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getFirebaseData();
        if (result.success && typeof result.success === 'object') {
          // Convert object values into an array
          const dataArray = Object.values(result.success);
          setData(dataArray);
          console.log(dataArray);
        } else {
          console.log('Data is not in the expected format:', result.success);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Map over the data and render each item */}
        {data.map((item) => (
          <div key={item.id}>
            {/* Assuming 'name' is a property of each item */}
            <p>{item.name}</p>
            {/* Assuming 'hobby' is a property of each item */}
            <p>{item.hobby}</p>
            {/* Add more JSX elements as needed based on your data structure */}
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
