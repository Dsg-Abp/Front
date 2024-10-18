// import React, { createContext, useContext, useState, ReactNode} from 'react';
// import api from '../services/api';
// import { CaloriesDataType } from '../types/calories';

// interface CaloriesContextType{
//     calories: CaloriesDataType[];
//     setCalories: React.Dispatch<React.SetStateAction<CaloriesDataType[]>>;
//     searchCalories: (userId: string) => Promise<void>;
// };

// const CaloriesContext = createContext<CaloriesContextType | undefined>(undefined);

// export const CaloriesProvider = ({children}:{children: ReactNode}) => {
//     const [calories, setCalories] = useState<CaloriesDataType[]>([]);

//     const searchCalories = async(userId:string) => {
//         try{
//             const response = await api.get(`/dataProfile/${userId}`);
//             setCalories(response.data);
//         } catch(err) {
//             console.error("Erro ao buscar calorias", err);
//         }
//     };
//     return (
//         <CaloriesContext.Provider value={{calories, setCalories, searchCalories}}>
//             {children}
//         </CaloriesContext.Provider>
//     )
// };

// export const useCaloriesContext = () => {
//     const context = useContext(CaloriesContext);
//     if(!context){
//         throw new Error('useCaloriesContext must be used within a CaloriesProvider');
//     }
//     return context;
// }