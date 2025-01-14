import OpenAI from "openai";
import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;


const app = express();
app.use(cors());
app.use(express.json());
const port = 3000

const openai = new OpenAI({apiKey: openaiApiKey});

app.post("/chat", async (req, res) => {
    const courseName = req.body.courseName;
    const typeOfAssignment = req.body.typeOfAssignment;
    const grading = req.body.grading; 

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant. " },
            {
                role: "user",
                content: "You are a professor in higher education teaching a course on " + 
                        courseName + 
                        " and you have a PHd. You are also an expert in evaluation. Using your background, please create a grading rubric for " + 
                        typeOfAssignment + 
                        " using " + 
                        grading + 
                        ". The grading rubric should have only 1 complete statement with 0 to 5 grade.Deliver the response here in plain text without any formatting",
            },
        ], 
    });
    const responseContent = completion.choices[0].message.content.trim();
    res.json({ response: responseContent });
    console.log(completion.choices[0].message.content.trim());
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

// https://platform.openai.com/docs/api-reference/chat/create
// https://platform.openai.com/docs/quickstart?context=node&quickstart-example=completions
// https://medium.com/@kylehe970128/how-to-use-openai-api-in-react-js-enhancing-your-applications-with-ai-in-2024-02e248fdc889
// https://javascriptcentric.medium.com/how-to-use-openai-with-react-212d7d632854
// https://www.robinwieruch.de/langchain-javascript-openai/
// https://community.openai.com/t/newbie-help-needed-using-react-app-to-call-openai-api/134289
