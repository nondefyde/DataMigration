export async function fetchData(
  url: string,
  headers?: Record<string, any>,
  params?: Record<string, any>
) {
  try {
    const queryString = params ? new URLSearchParams(params).toString() : '';

    console.log('queryStringgggg', queryString);

    const response = await fetch(`${url}?${queryString}`, {
      method: 'GET',
      headers: headers,
    });

    // console.log('responseeeeeeeeee', response);

    // Check if the response status is OK (status code 200–299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Assuming the response is in JSON format
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // You can choose how to handle errors (e.g., return null or throw error)
  }
}

export const camelCaseToSentence = (camelCaseString: string) => {
  // const words = camelCaseString.split(/(?=[A-Z])/);
  // const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  // const sentence = capitalizedWords.join(' ');
  // return sentence;

  const sentence = camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2');

  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
};

export async function postData(url: string, headers: Record<string, string>, payload: any) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers, // Add custom headers
      },
      body: JSON.stringify(payload), // Convert body to JSON
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Assuming the response is in JSON format
    return data;
  } catch (error) {
    console.error('Error during POST request:', error);
    throw error;
  }
}
