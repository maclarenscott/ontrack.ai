import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import React from 'react'
import { useRouter } from 'next/router'

export default function Question() {
    
    const router = useRouter()
    const { question } = router.query
    

    return (
        <>
            
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
                                        What are your financial goals? This could include things like saving for retirement, paying off debt, buying a house, or funding a child's education.
                                        </p>

                                        <div className="form-group">
                                            <div className="row justify-content-center my-4">
                                                <input type="email" className="mx-1 col-5 form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="name"></input>
                                                <button type="submit" className="mx-1 col-2 btn btn-primary">Next</button>
                                            </div>
                                        </div>
                                        <small id="emailHelp" className="form-text text-muted text-center">Enter your name to get started</small>
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