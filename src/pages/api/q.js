

const currentSession = {};
const answers = {}

const genRanHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

const postHandler = (req, res) => {
    const sessionId = req.body.session_id || genRanHex(16);
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


    if (currentSession[sessionId].length >= 4) {
        console.log('triggered')
        const prompt = currentSession[sessionId].map((question) => `\n\nQ: ${question.question}\nA: ${question.answer}`).join('');
        const apiKey = "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";
        const request = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-001",
                prompt: `Give me in-depth financial advice based on the following questions and answers:\n\n
        \n${prompt}`,
                max_tokens: 1000,
            }),
        };

        const url = "https://api.openai.com/v1/completions";
        fetch(url, request)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                answers[sessionId] = response.choices[0].text
                return res.status(200).json({advice:answers[currentSession] ,session_id: sessionId, questions: currentSession[sessionId],advice: response.choices[0].text });
            });
    }
    return res.status(200).json({ session_id: sessionId, questions: currentSession[sessionId],advice:"Advice will be generated" });

};

export default (req, res) => {
    if (req.method === 'POST') {
        return postHandler(req, res);
    }
}
