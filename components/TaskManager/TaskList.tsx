import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { Box, VStack } from '@chakra-ui/react'
import { Task } from '../../types/task'
import Loading from '../TaskList/Loading'
import QueryError from '../TaskList/QueryError'
import TaskCard from './TaskCard'
import CreateButton from './CreateButton'

const fetchTasks = async (): Promise<any> => {
  const baseUrl = 'http://127.0.0.1:3000/'
  const endPoint = 'task'
  const data = await fetch(baseUrl + endPoint)
  return await data.json()
}

export default function TaskList (): ReactElement {
  const { data: tasks, isSuccess, isLoading, error, refetch } = useQuery('tasks', async () => await fetchTasks(), {
    refetchOnWindowFocus: false
  })

  if (isLoading) { return <Loading /> }

  if (error != null) { return <QueryError /> }

  if (isSuccess) {
    return (
      <>
        <Box w='full'><CreateButton fetchCallBack={refetch} /></Box>
        <VStack spacing='16px' w='full' mx='20px'>
          {
        tasks.map((task: Task) =>
          <TaskCard key={task._id} task={task} updateCallBack={refetch} />
        )
        }
        </VStack>
      </>
    )
  }

  return <></>
};
