import React, { FC } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { Session } from '../data'

const SessionListItem: FC<{ session: Session }> = ({ session }) => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(
    () => {
      return new Promise((res) => res('Ok'))
    },
    {
      onSuccess: () => {
        const sessions = queryClient.getQueryData<Session[]>('sessions')
        const updatedSession = { ...session, isFavorite: !session.isFavorite }
        const updatedSessions = sessions?.map((item) => (item.id === session.id ? updatedSession : item))
        queryClient.setQueryData('sessions', updatedSessions)
      },
    },
  )

  const toggleFavorite = () => {
    mutateAsync()
  }

  const sessionClass = session.type

  return (
    <div className={`card-panel margin-20 ${sessionClass}`}>
      <div className="card-stacked list-item-container">
        <span className="capitalize">{session.type}</span>
        <span>{session.date}</span>
        <Link to={`/session/${session.id}`}>See more</Link>
        <button onClick={toggleFavorite}>
          <i className="material-icons">{session.isFavorite ? 'bookmark' : 'bookmark_border'}</i>
        </button>
      </div>
    </div>
  )
}

export default SessionListItem
