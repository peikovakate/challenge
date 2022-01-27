import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { Loader } from '../components/Loader'
import SessionListItem from '../components/SessionListItem'
import { mockApiCallToFetchSessions } from '../data'

const Home: FC = () => {
  const {
    data: sessions,
    isFetching,
    isLoading,
  } = useQuery('sessions', mockApiCallToFetchSessions, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (sessions) => sessions.sort((a, b) => +b.isFavorite - +a.isFavorite),
  })

  if (isFetching || isLoading) {
    return Loader
  }

  return (
    <div className="container center">
      {sessions?.map((session) => (
        <SessionListItem session={session} key={session.id} />
      ))}
    </div>
  )
}

export default Home
