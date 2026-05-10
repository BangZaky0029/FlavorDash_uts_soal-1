import { useState, useEffect } from 'react';
import { Food } from '../types/Food';

export const useFoods = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
        
        if (!apiUrl) {
          throw new Error("URL API tidak ditemukan di .env");
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`API Error HTTP Status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.meals && data.meals.length > 0) {
          const formattedData: Food[] = data.meals.map((meal: any) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            description: `Nikmati kelezatan sajian laut khas dari ${meal.strMeal} dengan bahan segar pilihan.`,
            price: Math.floor(Math.random() * (75 - 25 + 1) + 25) * 1000,
          }));
          
          setFoods(formattedData);
        } else {
          setFoods([]);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Terjadi kesalahan jaringan atau server';
        setError(message);
        console.error('Gagal fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return { foods, loading, error };
};
