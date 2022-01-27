import React, { FC, useCallback } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { mockApiCallToFetchSessions, Session } from '../data'
import '../styles.css'
import dayjs from 'dayjs'

import AdvancedFormat from 'dayjs/plugin/advancedFormat'
import Duration from 'dayjs/plugin/duration'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { Loader } from '../components/Loader'

import { ReactComponent as Back } from '../icons/chevron-left.svg'
import { getIntensity, getRest } from '../helpers'

dayjs.extend(Duration)
dayjs.extend(AdvancedFormat)
dayjs.extend(RelativeTime)

const Note: FC<{ text: string }> = ({ text }) => (
  <div className="row">
    <span>{text}</span>
  </div>
)

export const getContent = (session: Session) => {
  switch (session.type) {
    case 'recovery':
      return (
        <>
          <Note text={getRest(session.restLevel)} />
          <Note text={session.description} />
        </>
      )
    case 'training':
      return (
        <>
          <Note text={getIntensity(session.restLevel)} />
          <Note text={`The load was ${session.load}`} />
        </>
      )
    default:
      return null
  }
}

const Header: FC<{ session: Session }> = ({ session }) => {
  const navigate = useNavigate()
  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const sessionClass = session?.type

  return (
    <div className={`header ${sessionClass}`}>
      <button style={{ width: 25, height: 25 }}>
        <Back fill="white" onClick={goBack} />
      </button>
      <p className="title">{session.type}</p>
      <p className="info">{dayjs(session.date).format('MMMM Do')}</p>
      <p className="info">
        {session?.startTime}:{session.endTime} • {dayjs.duration({ minutes: session.duration }).humanize()}
      </p>
    </div>
  )
}

const SessionScreen: FC = () => {
  let { sessionId } = useParams()

  const {
    data: session,
    isFetching,
    isLoading,
  } = useQuery('sessions', mockApiCallToFetchSessions, {
    select: (sessions) => sessions.find((session) => session.id === parseInt(sessionId || '')),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  if (isFetching || isLoading || !session) {
    return Loader
  }

  return (
    <div className="content">
      <Header session={session} />
      <div className="margin-20">{getContent(session)}</div>
    </div>
  )
}

export default SessionScreen
