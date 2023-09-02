import OpenAI from "openai";

  const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
      dangerouslyAllowBrowser:true
  });

export const getRecommendations=async (data:{
    date: string;
    climate: string;
    company: string;
    duration: string;
    interests: string;
    budgetLevel: string;
})=>{

    try {
        const chatCompletion = await openai.chat.completions.create({
          messages: [{ role: "system", content: "you are a helpful travel bot" },
          { role: "user", content: ` 
          help me pick my next destination
           according to the following data please return 8 destinations
          ` },
          { role: "assistant", content: `could you please provide me with some additional information? Specifically:
          1. Interests and Activities: What types of activities do you enjoy during your travels? For example, are you interested in beach relaxation, cultural exploration, adventure sports, historical sites, shopping, nature hikes, or something else?
          2. Company: Are you traveling alone, with a partner, family, or friends? Knowing who you're traveling with can help tailor the recommendations.
          3. Budget: What's your approximate budget range for the trip, including accommodation, transportation, meals, and activities?
          4. Date: In What time of the year you want to travel,
          5. Duration: How long do you plan to stay at each destination? Is this a short weekend getaway, a week-long vacation, or an extended trip?
          6. Climate Preferences: Do you prefer a specific type of climate? For example, tropical, temperate, arid, or cold?`},
         
           { role: "user", content: `${Object.values(data)}`}],
         functions:[
          {name:"travel_data"
          ,description:"returns json array of the 8 most suitable destinations according to provided data",
          parameters:
            {type:"object",
            properties:{
              data:{type:"array",description:"this is the result array",items:
            {type:"object",
              properties:
                {
      destination:{type:"string",description: "destination name"},
      description:{type:"string",description: "explanation on the destination"}
                } 
              }}}}}],
              function_call : {
                "name": "travel_data"
            },
           model: "gpt-3.5-turbo",
      });
      return JSON.parse(chatCompletion.choices[0].message.function_call.arguments).data
      } catch (error) {
        new Error(error.message)
      }
}