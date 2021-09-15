import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {isWaiting, isLoading, error, questions, index, correct} = useGlobalContext()
  if (isWaiting) {
    return <SetupForm />
  }

  if (isLoading) {
    return <Loading/>
  }
  return <main>
    quiz app
  </main>
}

export default App
