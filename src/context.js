import axios from 'axios'
import React, { useState, useContext } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy'
  })

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
        openModal()
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

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsWaiting(true)
    setCorrect(0)
    setIsModalOpen(false)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setQuiz({...quiz, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {amount, category, difficulty} = quiz
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`
    fetchQuestions(url)
  }

  return <AppContext.Provider value={{
    isWaiting,
    isLoading,
    questions,
    index,
    error,
    correct,
    isModalOpen,
    nextQuestion,
    checkAnswer,
    closeModal,
    quiz,
    handleChange,
    handleSubmit
  }}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
