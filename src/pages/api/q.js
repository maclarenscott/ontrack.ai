

const currentSession = {};
const answers = {}

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const genRanHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

const postHandler = (req, res) => {
    console.log(`process.env.api_key: ${process.env.api_key}`)
    const api_key = process.env.api_key;
    const sessionId = req.body.session_id || genRanHex(16);
    const session_id = sessionId;
    try {
        if (req.body.session_id in answers) {
            return res.status(200).json({ advice: answers[sessionId] });
        }
    } catch { }
    // if ((!req.body.question_id || !req.body.question) && !req.body.answer) {
    //     return res.status(400).json({ error: 'Missing body elements' });
    // }


    //     return res.status(200).json({ session_id: sessionId, questions: current_session[sessionId], advice: answers[sessionId] })
    // }

    currentSession[sessionId] = currentSession[sessionId] || [];
    currentSession[sessionId].push({
        question_id: req.body.question_id,
        question: req.body.question,
        answer: req.body.answer,
    });


    if (currentSession[sessionId].length > 4) {
        console.log('triggered')
        const postfix = currentSession[sessionId].map((question) => `\n\nQ: ${question.question}\nA: ${question.answer}`).join('');
        // const api_key = process.env.api_key;
        const prompt = `\n\nWhat financial advice would you give me, based on my responses to the following questions?\n\n${postfix}\nWhat could I improve on?`;
        console.log(prompt);
        const request = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model: "text-davinci-001",
                prompt: prompt,
                max_tokens: 1000,
            }),

        };
        console.log("TO GPT-3")
        

        const url = "https://api.openai.com/v1/completions";
        fetch(url, request)
            .then((response) => {
                // console.log("preresponse")
                // console.log(typeof(response.choices[0].text))
                // console.log('postresponse')
                return response.json()})
            .then((response) => {
                console.log(response);
                answers[sessionId] = response.choices[0].text
                return res.status(200).json({advice:answers[currentSession] ,session_id: sessionId, questions: currentSession[session_id],advice: response.choices[0].text });
                
            });
    }
    else {
        return res.status(200).json({ session_id: sessionId, questions: currentSession[sessionId],advice:"Advice will be generated" });
    }

};

export default (req, res) => {
    if (req.method === 'POST') {
        return postHandler(req, res);
    }
}
