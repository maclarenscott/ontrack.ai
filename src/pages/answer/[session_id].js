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




function redirectToUrl(url) {
    window.location.href = url;
}

function getAnswer(session_id) {
    const request = {
        "method": 'POST',
        "headers": { 'Content-Type': 'application/json' },
        "body": JSON.stringify({
            "session_id": session_id
        })

    }
    fetch(`http://localhost:3000/api/q?answer=true&session_id=${session_id}`, request)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data['advice']
        }).catch(err => {
            console.log(err)
        }
        )
}


export default function answer() {

    const router = useRouter()

    const { session_id } = router.query

    const [answer, setAnswer] = useState('');
    let loaded = false;

    if (session_id == undefined) {
        console.log('no session id')
        return (
        <>
            The page you are looking for is invalid.
        </>)
    } else {
        return (
            <>
                {
                (!loaded)?
                <>{()=>{
                    setAnswer(getAnswer(session_id));
                    loaded=true;
                    console.log(answer)
                    return''
                    }} </>: "..."}

                <Head>
                    <title>Personalized Advice</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>

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
                                                Advice
                                            </h1>
                                            <p className='text-2xl text-muted text-center'>
                                                {answer}
                                            </p>

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