import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {
    isWaiting,
    isLoading,
    error,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
    closeModal
  } = useGlobalContext()
  if (isWaiting) {
    return <SetupForm />
  }

  if (isLoading) {
    return <Loading/>
  }

  const {question, correct_answer, incorrect_answers} = questions[index]
  let answers = [ ...incorrect_answers]
  const tempIndex = Math.floor(Math.random() * 4)
  if (tempIndex === 3) {
    answers.push(correct_answer)
  } else {
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct_answer
  }

  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className="correct-answers">
          correct answers : {correct} / {index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{__html: question}} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className='answer-btn'
                  onClick={() => checkAnswer(answer === correct_answer)}
                  dangerouslySetInnerHTML={{__html: answer}}
                />
              )
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  )
}

export default App
