import OpenAI from "openai";
import express from 'express';
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000

const openai = new OpenAI({ apiKey: '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' });

app.post("/chat", async (req, res) => {
    const courseName = req.body.courseName;
    const typeOfAssignment = req.body.typeOfAssignment;
    const grading = req.body.grading; 

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "You are a professor in higher education teaching a course on " + 
                        courseName + 
                        " and you have a PHd. You are also an expert in evaluation. Using your background, please create a grading rubric for " + 
                        typeOfAssignment + 
                        " using " + 
                        grading + 
                        ". The grading rubric should have only 1 complete statement with 0 to 5 grade.",
            },
        ], 
    });

    console.log(completion.choices[0].message.content);
    res.send(completion.choices[0].message); 
});

async function main() {
    const stream = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ 
            role: "user", 
            content: "Say this is a test" }],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

//main();