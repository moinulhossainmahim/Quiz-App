import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchQuestions = async (url) => {
    setIsLoading(true)
    setIsWaiting(false)
    const response = await axios(url).catch((error) => console.log(error))
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data)
        setIsWaiting(false)
        setIsLoading(false)
        setError(false)
      } else {
        setIsWaiting(true)
        setError(true)
      }
    } else {
      setIsWaiting(true)
    }
  }

  
  const nextQuestion = () => {
    setIndex((prevIndex) => {
      let index = prevIndex + 1
      if (index > questions.length - 1) {
        return 0
      }
      return index
    })
  }
  
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((prevState) => prevState + 1)
    }
    nextQuestion()
  }

  useEffect(() => {
    fetchQuestions(tempUrl)
  }, [])

  return <AppContext.Provider value={{
    isWaiting,
    isLoading,
    questions,
    index,
    error,
    correct,
    isModalOpen,
    nextQuestion,
    checkAnswer
  }}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
