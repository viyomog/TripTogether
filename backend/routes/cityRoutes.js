const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateCityInfo = async (city) => {
  try {
    const prompt = `
Generate travel information for ${city}.

Return ONLY valid JSON in this exact format:

{
  "oneLiner": "",
  "description": "",
  "rating": "",
  "bestTime": "",
  "bestTimeReason": "",
  "whyVisit": [],
  "mustVisit": [],
  "famousFood": []
}

Rules:
- OneLiner should be a tagline for that city
- Keep description short and engaging.
- rating should be out of 10.
- whyVisit should contain 4 points.
- mustVisit should contain 5 attractions.
- famousFood should contain 5 local foods.
- No markdown.
- No explanation.
- JSON only.
`;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    const cleanedText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini Error:", error);

    throw error;
  }
};

router.get("/:city", async (req, res) => {
  try {
    const { city } = req.params;

    const cityInfo = await generateCityInfo(city);

    res.status(200).json(cityInfo);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate city info",
    });
  }
});

router.post("/ai-plan", async (req, res) => {
  try {
    const { userPrompt } = req.body;

    if (!userPrompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    let currentDate = new Date();

    const prompt = `
You are an intelligent AI travel planner.

Generate a realistic day-wise travel itinerary.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. No markdown.
3. No explanations.
4. No extra text.
5. Response MUST always be a JSON array.
6. Follow the exact structure below.

RESPONSE FORMAT:

[
  {
    "day": 1,
    "places": [
      "India Gate",
      "Red Fort",
      "Connaught Place"
    ]
  }
]

PLANNING RULES:

- If the user mentions a country/state/region:
  generate famous cities or destinations.

- If the user mentions a city:
  generate attractions inside that city.

- Multiple places can be visited in one day.

- Group nearby attractions together.

- Keep travel practical and realistic.

- Minimum 1 place per day.
- Maximum 4 places per day.

- Generate according to the trip duration mentioned by the user.

- If no duration is mentioned:
  intelligently choose a reasonable duration.

USER PROMPT:
${userPrompt}
`;

    const result = await model.generateContent(prompt);

    const response = result.response;

    let aiText = response.text().trim();

    console.log("RAW AI RESPONSE:");
    console.log(aiText);

    // CLEAN AI RESPONSE
    aiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const firstBracket = aiText.indexOf("[");
    const lastBracket = aiText.lastIndexOf("]");

    if (
      firstBracket !== -1 &&
      lastBracket !== -1
    ) {
      aiText = aiText.slice(
        firstBracket,
        lastBracket + 1
      );
    }

    let parsedData;

    try {
      parsedData = JSON.parse(aiText);
    } catch (parseError) {
      console.log("JSON Parse Error:", parseError);

      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response",
      });
    }

    // FINAL TIMELINE FORMAT
    const tripPlan = [];

    parsedData.forEach((dayPlan) => {
      const formattedDate = currentDate
        .toISOString()
        .split("T")[0];

      if (
        Array.isArray(dayPlan.places)
      ) {
        dayPlan.places.forEach((place) => {
          tripPlan.push({
            id: uuidv4(),

            place,

            date: formattedDate,
          });
        });
      }

      // NEXT DAY
      currentDate.setDate(
        currentDate.getDate() + 1
      );
    });

    return res.status(200).json({
      success: true,
      tripPlan,
    });
  } catch (err) {
    console.error("AI Error:", err);

    return res.status(500).json({
      success: false,
      message: "AI failed to generate trip",
    });
  }
});

module.exports = router;
