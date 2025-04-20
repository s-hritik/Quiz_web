import React, { useRef, useState } from "react";
import './Quiz.css'
import {questions} from '../assets/data'

const Quiz = () =>{

  let[index, setindex] = useState(0)
  let[question,setquestions]= useState(questions[index])
  let[lock, setlock] = useState(false)
  let[score,setscore]= useState(0)
  let [result, setresult] = useState(false)

  let option1 =useRef(null)
  let option2 =useRef(null)
  let option3 =useRef(null)
  let option4 =useRef(null)

  let option_arr = [option1, option2, option3, option4]

  const checkans = (e,ans) =>{
      if(lock === false){
        if(question.ans===ans){
          e.target.classList.add("correct")
          setlock(true)
          setscore(prev=>prev+1)
        }
        else{
          e.target.classList.add("Incorrect")
          setlock(true)
          option_arr[question.ans-1].current.classList.add("correct")
        }
      }
  }

  const Next = () =>{
    if(lock === true){
      if(index=== questions.length-1){
        setresult(true)
        return 0
      }
      setindex(++index)
      setquestions(questions[index])
      setlock(false)
      option_arr.map((option)=>{
        option.current.classList.remove("correct")
        option.current.classList.remove("Incorrect")
        return null;
      })
    }
  }

  const reset = () =>{
    setindex(0),
    setscore(0),
    setquestions(questions[0])
    setlock(false)
    setresult(false)
  }

   return(
    <>
    <div className="container">
          <h1>Quiz App</h1>
          <hr />
          {result?<></>:<>
            <h2> {index+1}.{question.Questions}</h2>
          <ul>
            <li ref = {option1}  onClick = {(e)=> (checkans(e,1))}>{question.option1}</li>
            <li ref = {option2}  onClick = {(e)=> (checkans(e,2))}>{question.option2}</li>
            <li ref = {option3} onClick = {(e)=> (checkans(e,3))}>{question.option3}</li>
            <li ref = {option4}  onClick = {(e)=> (checkans(e,4))}>{question.option4}</li>
          </ul>
          <button onClick= {Next}>Next</button>
          <div className="index"> {index+1} of {questions.length} Questions</div>
          </>}
          {result?<> <h2>Score {score} out of {questions.length}</h2>
          <button onClick={reset}>Reset</button></>:<></>}
         
         
    </div>
    </>
   )
}
export default Quiz;