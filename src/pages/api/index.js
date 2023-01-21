export default function handler(req, res) {
    //recieve the question from the client, store it in a hashmap   
    //with key being session id, and updating the session array with the question id

    //get the session id from the request
    const session_id = req.query.session_id
    //get the question id from the request
    const question_id = req.query.question_id
    //get the question from the request
    const question = req.query.question

    //print the question to the console
    console.log(question);


}