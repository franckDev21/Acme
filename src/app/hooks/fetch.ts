export const BASE_URL = 'http://localhost:8000/api/';

interface FetchDataOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
}

// Utilisez la syntaxe générique pour spécifier le type de données que vous attendez en réponse.
export async function fetchData<T>(endpoint: string, options: FetchDataOptions = {}, allUrl?: boolean): Promise<T> {
  const url = allUrl ? endpoint :`${BASE_URL}/${endpoint}`;

  try {
    // Utilisez la désagrégation pour rendre le code plus clair.
    const response = await fetch(url, {
      method: options.method || 'GET',  // Utilisez l'option ou la valeur par défaut 'GET'.
      headers: {
        'Content-Type': 'application/json',
        // Ajoutez ici d'autres headers si nécessaire
        ...(options.headers || {}),  // Utilisez l'option ou un objet vide.
      },
      body: options.body,  // Aucune modification nécessaire ici.
      ...options,  // Désagrégation de l'objet options pour inclure d'autres propriétés.
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Utilisez la syntaxe "as T" pour indiquer au compilateur TypeScript que vous attendez un type spécifique.
    const data = await response.json() as T;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
