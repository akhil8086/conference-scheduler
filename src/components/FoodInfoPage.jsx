

// import React, { useEffect, useState } from 'react';
// import Header from './Header';
// import axios from 'axios';

// function FoodInfoPage() {
//   const [foodInfo, setFoodInfo] = useState([]);

//   useEffect(() => {
//     axios.get('YOUR_API_ENDPOINT/food-info')
//       .then((response) => {
//         setFoodInfo(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching food information:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <Header />
//       <h2 className="text-2xl font-bold my-4">Food Options</h2>
//       <ul className="list-disc pl-6">
//         {foodInfo.map((food, index) => (
//           <li key={index} className="mb-2">
//             <div className="flex items-center">
//               <img
//                 src={food.imageURL}
//                 alt={food.name}
//                 className="w-12 h-12 rounded-full mr-3"
//               />
//               <div>
//                 <p className="text-lg font-semibold">{food.name}</p>
//                 <p className="text-gray-600">{food.description}</p>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default FoodInfoPage;



import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';

function FoodInfoPage() {
  const [foodInfo, setFoodInfo] = useState([]);

  useEffect(() => {
   
    axios.get('YOUR_API_ENDPOINT/food-info')
      .then((response) => {
        setFoodInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching food information:', error);
      });
  }, []);

  return (
    <div>
      <Header />
      <h2 className="text-2xl font-bold my-4">Food Options</h2>
      <ul className="list-disc pl-6">
        {foodInfo.map((food, index) => (
          <li key={index} className="mb-4">
            <div className="flex items-center">
              <img
                src={food.imageURL}
                alt={food.name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="text-lg font-semibold">{food.name}</p>
                <p className="text-gray-600">{food.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodInfoPage;
