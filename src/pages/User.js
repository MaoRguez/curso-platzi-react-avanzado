import React, { useContext, Fragment } from 'react'
import { Context } from '../Context'
import { SubmitButton } from '../components/SubmitButton/index'

export const User = () => {
  const { removeAuth } = useContext(Context)
  return <Fragment>
    <h1>User</h1>
    <SubmitButton onClick={removeAuth}>Cerrar Sesión</SubmitButton>
  </Fragment>
}