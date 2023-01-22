
const current_session = {}
const answers = {}

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export default function handler(req, res) {
    // return res.status(200).json({ message: req.body.answer })
    //check if body elements are there
    if (!req.body.question_id || !req.body.question || !req.body.answer) {
        return res.status(400).json({ error: 'Missing body elements' })
    }

    if (req.method === 'POST') {
        
        //take all the questions and convert them into a prompt

        let session_id;
        if (!req.body.session_id) {
            //create a new session hash
            session_id = genRanHex(16);
        } else {
            session_id = req.body.session_id;
        }
        if (!(session_id in current_session)) {
            current_session[session_id] = []
        }
        //if session id in answers, return answer
        // if (session_id in answers) {
        //     return res.status(200).json({ session_id: session_id, questions: current_session[session_id], advice: answers[session_id] })
        // }
        current_session[session_id].push({
            question_id: req.body.question_id,
            question: req.body.question,
            answer: req.body.answer,
        })
        if (current_session[req.body.session_id]) {
            if (current_session[req.body.session_id].length > 4) {
                //make a request to gpt-3
                const prompt = `\n\nWhat financial advice would you give me, based on my responses to the following questions?\n\n
        ${current_session[req.body.session_id].map((question) => {
                    return `\n\nQ: ${question.question}\nA: ${question.answer}`
                }).join('')}
        `
                console.log(prompt);

                const api_key = "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";
                let request = {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${api_key}`
                    },
                    body: JSON.stringify({
                        "model": "text-davinci-001",
                        "prompt": `Give me in-depth financial advice based on the following questions and answers:\n\n
                        "session_id": "17d6ae457edbf1cb",
                        ${prompt}
                        `,

                        //     "prompt": `\n\nWhat financial advice would you give me, based on my responses to the following questions?\n\n
                        // ${current_session[req.body.session_id].map((question) => {
                        //         return `\n\nQ: ${question.question}\nA: ${question.answer}`
                        //     }).join('')}
                        // `,
                        "max_tokens": 500,
                    }
                    )
                }

                const url = "https://api.openai.com/v1/completions";
                fetch(url, request
                )
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        answers[session_id] = response.choices[0].text
                        return res.status(200).json({ session_id: req.body.session_id, questions: current_session[req.body.session_id], advice: response.choices[0].text })
                    })
            } else {
                return res.status(200).json({ session_id: session_id, questions: current_session[session_id] })
            }
        }




    }
}