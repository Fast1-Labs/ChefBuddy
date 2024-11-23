export const fetchMealSuggestions = async (ingredients: string[]) => {
  try {
    const response = await fetch(`http://www.recipepuppy.com/api/?i=${ingredients.join(',')}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch meal suggestions: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching meal suggestions:', error);
    throw error;
  }
};
