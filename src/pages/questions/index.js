//make a list of question components and display them in a vertical column
//
import { useState } from 'react'
import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Question from '@/components/Question'

export default function QuestionList() {
    const questions = []
    //add n question components to the list
    for (let i = 0; i < 10; i++) {
        questions.push(i)
    }
    return (
        <>
            <Head>
                <title>Question List</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

            </Head>
            <main className='main-content'>
                <Question question="1"/>
            </main>
        </>
    )
}




