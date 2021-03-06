import { Container, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import TaskList from '../components/TaskList/TaskList'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>

      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon-cleaning2.png' />
      </Head>

      <Container maxW='80p' justifyContent='start' className={styles.main}>
        <Heading>All Cleaning Tasks</Heading>
        <TaskList sessionDuration={0} />
      </Container>

    </div>
  )
}

export default Home
