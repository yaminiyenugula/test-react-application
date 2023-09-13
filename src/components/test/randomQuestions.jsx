import React, { useEffect, useState } from 'react'
import './random.css'
import { Collapse, Radio, Button } from 'antd';
import {data} from './data'
export const QuestionsComponent = () => {
    const [qsn, setQsn] = useState(1)
    const [showQsn, setShowQsn] = useState(false)
    const [result, setResult] = useState(0)
    const [questonObj, setQuestionObj] = useState(null)
    const [showResults, setShowResults] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null) // Added selectedOption state
    const [allQsn, setAllQsn] = useState(data) 
    let a=[1,2,3]
    const getQuestions=()=>{
       const res= fetch('http://localhost:8000/questions/')
      .then(response => response.json())
           .then(res => setAllQsn(res))
      console.log(res,"//////////////////////aaaaaaaaaaaa")
    }

    const showQuestions = () => {
        setShowQsn(true)
    }

    useEffect(() => {
        let qsns = allQsn.filter((data, index) => index + 1 == qsn)
        qsns && setQuestionObj(qsns[0])
        setSelectedOption(null);
        if (qsn > allQsn.length) {
            setShowResults(true)
        }

    }, [qsn, allQsn])
    useEffect(()=>{
        // getQuestions()
    },[])
    const handleOptionClick = (optionSelection, optionIndex) => {
        console.log(optionIndex, "optionIndex")
        let qs = { ...questonObj }
        qs.options[optionIndex].is_selected = true

        setQuestionObj(qs)
        setTimeout(() => {
            setQsn(qsn + 1);
        }, 1000);
        console.log(questonObj.correctOption, optionSelection)
        if (optionSelection == questonObj.correctOption) {
            setResult(result + 1)
        }
    }
    console.log(questonObj, "questonObj")
    console.log(qsn, "qsn")

    return (
        <>
            {!showQsn && <div className='start-pop'>
                <button className={`btn btn-primary start-test`} style={{ display: showQsn ? "none" : "block" }} type="submit" onClick={showQuestions}>Strat Test</button>

            </div>}
            <div className='container'>
                <div className='qsn-container'>
                    <div >
                        {showResults ?
                            <div className='details-cont'>
                                <div className='heading'>results</div><br />
                                <span className='res'>Total questions:{allQsn.length}</span><br />
                                <span className='res'>Answerd:{qsn - 1}</span><br />
                                <span className='res'>Correct Answers{result}</span><br />
                                <span className='res'>Wrong Answers{allQsn.length-result}</span>

                            </div>
                            : <div className='details-cont'>
                                <div className='heading' style={{ fontFamily:"Poppins"}}>Quiz</div>
                                <div className='nav-header'> 
                                    <div>
                                        <span style={{ fontFamily: "Poppins" }}>Total Questions:{allQsn.length}</span><br />
                                        <span style={{ fontFamily: "Poppins" }}>Answerd:{qsn - 1}</span>
                                    </div>
                                    <div>
                                        <span style={{ fontFamily: "Poppins" }}>Question No :{qsn}</span>

                                    </div>
                                </div>
                              

                            </div>}

                        <div style={{ display: showQsn ? "block" : "none" }}>
                            {
                                questonObj && <div className='qsn-container'>
                                    {
                                        <>
                                            <div className='question'>
                                                Question : {questonObj.question}
                                            </div>
                                            <div>
                                                {questonObj.options.map((optionObj, index) => {
                                                    return (

                                                        <label htmlFor={`option${index}`} className='option-cont'>
                                                            <input type='radio' id={`option${index}`} onClick={() => {
                                                                handleOptionClick(optionObj.id, index)
                                                            }} checked={optionObj?.is_selected ? true : false} />

                                                            <span>{optionObj.option}</span>
                                                        </label>

                                                    )
                                                })
                                                }
                                            </div>
                                        </>
                                    }

                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}


{/* <Radio
                                                            key={index}
                                                            value={optionObj.id}
                                                            onClick={() => {
                                                                setQsn(qsn + 1)
                                                                if (optionObj.id == questonObj.correctOption) {
                                                                    setResult(result + 1)
                                                                }
                                                            }}
                                                            checked={selectedOption === optionObj.id}                                                     >
                                                            {optionObj.option}
                                                        </Radio> */}