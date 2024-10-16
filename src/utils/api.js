import axios from 'axios';

// Function to generate exam questions
export const generateQuestions = async (class1, subject, syllabus, level, numQuestions, maxMarks) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Get the API key from environment variables
  const apiUrl = "https://api.openai.com/v1/chat/completions"; // API endpoint

  // Constructing the request body
  const requestBody = {
    model: "gpt-4o-mini", // Model to use
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Generate a list of ${level} exam paper for ${class1}, ${subject} based on the following syllabus: ${syllabus}. 
                  Number of questions: ${numQuestions}, Maximum marks: ${maxMarks}.`,
      },
    ],
  };

  try {
    // Sending the POST request to the OpenAI API
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`, // Authorization header with the API key
      },
    });

    // Returning the content of the first choice
    return response.data.choices[0].message.content; 
  } catch (error) {
    console.error("Error generating exam paper:", error); // Logging any errors
    throw error; // Rethrowing the error for further handling
  }
};
