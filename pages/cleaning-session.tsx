import React, { ReactElement, useState } from 'react'
import { Button, ButtonGroup, Container, Heading, SimpleGrid } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import TaskSchedule from '../components/TaskList/TaskSchedule'
import Head from 'next/head'

export default function CleaningSession (): ReactElement {
  const [sessionDuration, setsessionDuration] = useState(0)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon-cleaning2.png' />
      </Head>

      <Container maxW={{ base: 'full', md: '80p' }} justifyContent='start' className={styles.main}>
        <Heading mb={8} textAlign='center'>Let&apos;s Optimize yout cleaning session!</Heading>
        <ButtonGroup variant='outline' spacing='6' colorScheme='green'>
          <SimpleGrid columns={[3, 3, 6, 6]} spacing={4} pb='8'>
            <Button onClick={() => setsessionDuration(15)}>15m</Button>
            <Button onClick={() => setsessionDuration(30)}>30m</Button>
            <Button onClick={() => setsessionDuration(60)}>01h</Button>
            <Button onClick={() => setsessionDuration(90)}>90m</Button>
            <Button onClick={() => setsessionDuration(120)}>02h</Button>
            <Button onClick={() => setsessionDuration(180)}>03h</Button>
          </SimpleGrid>
        </ButtonGroup>
        <TaskSchedule sessionDuration={sessionDuration} />
      </Container>

    </div>
  )
}
