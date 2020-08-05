import React from 'react'
import { FavsWithQuery } from '../container/GetFavorites'
import { Layout } from '../components/Layout/index'

export default () => (
  <Layout title='Tus favoritos' subtitle='Aquí puedes encontrar tus favoritos'>
    <FavsWithQuery />
  </Layout>
)