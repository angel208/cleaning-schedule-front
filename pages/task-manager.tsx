import React, { ReactElement } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import TaskList from '../components/TaskManager/TaskList'
import Head from 'next/head'

export default function TaskManager (): ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon-cleaning2.png' />
      </Head>

      <Container maxW='80p' justifyContent='start' className={styles.main}>
        <Heading mb={8}>Your Tasks</Heading>
        <TaskList />
      </Container>

    </div>
  )
}
