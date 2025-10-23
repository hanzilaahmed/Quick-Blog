// // import { GoogleGenAI } from "@google/genai";

// // // Create client with API key from environment variable
// // const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// // async function main(prompt) {
// //   try {
// //     const response = await ai.models.generateContent({
// //       model: "gemini-2.5-flash",
// //       contents: prompt,
// //     });

// //     // ✅ Use .text() to extract the text result
// //     return response.text();
// //   } catch (error) {
// //     console.error("Error generating content:", error.message);
// //     return "Sorry, the AI service is temporarily unavailable. Please try again later.";
// //   }
// // }

// // export default main;


// import { GoogleGenAI } from "@google/genai";
// import 'dotenv/config';

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// async function main(prompt) {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-1.5-flash-latest", // use stable model
//       contents: prompt,
//     });
//     return response.text();
//   } catch (error) {
//     console.error("Gemini error:", error.message);
//     return "Sorry, the AI service is temporarily unavailable.";
//   }
// }

// export default main;


import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

// Initialize Gemini client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini error:", error);
    return "Sorry, the AI service is temporarily unavailable.";
  }
}

export default main;
