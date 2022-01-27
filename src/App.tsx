import React, { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import SessionScreen from './screens/SessionScreen'

const queryClient = new QueryClient()

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="session/:sessionId" element={<SessionScreen />} />
      </Routes>
    </QueryClientProvider>
  )
}
