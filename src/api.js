
export const sendMessage = async (message) => {
    try {
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });
  
      if (response.ok) {
        console.log("Message Sent");
      } else {
        console.log("Error sending message");
      }
    } catch (error) {
      throw (error);
    }
};

export const fetchDataFromBackend= async(url)=> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      throw error;
    }
  }
  

  