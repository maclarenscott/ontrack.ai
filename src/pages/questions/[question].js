//creat a white background with a centered card with tailwind css
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] })


function getQuestionText(index) {



    const questions = [
        "What stage of your life are in?",
        "What is your current income and expenses?",
        "What are your current debt obligations? (e.g. student loans, credit card debt, mortgage, car loan)",
        "What are your short-term and long-term financial goals? (e.g. saving for a down payment, paying off debt, saving for retirement)",
        "What is your current savings and investment situation? (e.g. savings accounts, investment accounts, 401(k), stocks, bonds)",
        "What is your current insurance coverage? (e.g. health, life, property, liability)",
        "What is your current job or career situation? Are you looking to make a change or advance in your career?",
        "What is your current living situation? Do you rent or own your home?",
        "Do you have any plans to start a family or have children in the near future? If so, how do you plan to financially support them?",
        "What is your current retirement plan? If not, what steps do you plan to take to save for retirement?",
        "What is your tax situation? Are you taking advantage of all deductions and credits available to you?",
        "Do you have any experience with estate planning? Have you made a will or trust?"
    ]

    //include a sanity check
    if (index > questions.length || index < 1) {
        return "Error: question index out of bounds"
    }


    return questions[index - 1]
}


function redirectToUrl(url) {
    window.location.href = url;
}


function postQuestion(index, question, answer, session_id = "") {
    //post the answer to the question at index
    console.log('making a request')
    const request = {
        "method": 'POST',
        "headers": { 'Content-Type': 'application/json' },
        "body": JSON.stringify({
            question_id: index,
            question: question,
            answer: answer,
            session_id: session_id
        })

    }
    // console.log(request)


    fetch('http://localhost:3000/api/q', request)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.answer != undefined) {
                //redirect to results page
                redirectToUrl(`http://localhost:3000/results?session_id=${data.session_id}`)
            } else {
                redirectToUrl(`http://localhost:3000/questions/${index + 1}?session_id=${data.session_id}`)
            }

        }).catch(err => {
            console.log(err)
            //redirect to next question
        }
        )

}

export default function q() {



    const router = useRouter()
    const { question } = router.query
    const { session_id } = router.query
    const [input, setInput] = useState('');
    const [answer, setAnswer] = useState('');

    if (session_id == undefined && question != 1) {
        return (<>
            The page you are looking for is invalid.
        </>)
    } else {
        return (
            <>
                <Head>
                    <title>Question {question}</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>

                </Head>
                <main className='main-content'>
                    <div className={styles.description}>
                        {/* centered card */}
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <div className="card border-0 ">
                                        <div className="card-body ">
                                            <h1 className="text-4xl font-bold underline text-center">
                                                Question {question}
                                            </h1>
                                            <p className='text-2xl text-muted text-center'>
                                                {getQuestionText(parseInt(question))}
                                            </p>

                                            <div className="form-group">
                                                <div className="row justify-content-center my-4">
                                                    <input onInput={e => setInput(e.target.value)} value={input} type="email" className="mx-1 col-5 form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="response"></input>
                                                    {/* <Link onClick={
                                                        ()=>postQuestion(parseInt(question), getQuestionText(parseInt(question)), input, session_id)
                                                        } className='mx-1 col-2'
                                                        href='#'

                                                        //  href={question > 10 ? `/api` : ` /questions/${parseInt(question) + 1}`}
                                                         >
                                                    <button type="submit" className="btn btn-primary">Next</button>
                                                </Link> */}
                                                    {/* <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={() => {
                                                            postQuestion(parseInt(question), getQuestionText(parseInt(question)), input, session_id);
                                                            console.log(input)
                                                        }}
                                                    >Next</button> */}
                                                </div>
                                                {session_id == undefined || parseInt(question) < 5 ? 
                                                <div className="row justify-content-center my-4">
                                                <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={() => {
                                                            postQuestion(parseInt(question), getQuestionText(parseInt(question)), input, session_id);
                                                            console.log(input)
                                                        }}
                                                    >Next</button>
                                                </div>
                                                    :
                                                
                                                <div className="row justify-content-center my-4">
                                                    <Link href={`http://localhost:3000/answer/${session_id}?answer=true&session_id=${session_id}`}>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"

                                                        >Finish</button>
                                                    </Link>
                                                </div>}
                                            </div>
                                            {/* <small id="emailHelp" className="form-text text-muted text-center">Enter your name to get started</small> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>

        )
    }
}