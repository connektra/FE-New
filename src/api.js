// Below is a basic skeleton of an API which sends text to the nlp model. We can edit it to recieve responses from the model and display stuff accordingly.
// The api should be modified to return an array of buttons and take responses accordingly.
// Current skeleton only takes a plain text message as an input.
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

// The below api helps fetch data from the backend.
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
  

  