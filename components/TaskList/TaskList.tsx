import React, { ReactElement, useEffect } from 'react'
import { useQuery } from 'react-query'
import Loading from './Loading'
import QueryError from './QueryError'
import { TaskDTO } from './TaskDTO'
import TaskItem from './TaskItem'
import { VStack } from '@chakra-ui/react'

const fetchTaskList = async (availableTime: number): Promise<any> => {
  const baseUrl = 'http://127.0.0.1:3000/'
  const endPoint = availableTime > 0 ? `cleaning-session?availableTime=${availableTime}` : 'cleaning-session'
  const data = await fetch(baseUrl + endPoint)
  return await data.json()
}

export default function TaskList ({ sessionDuration = 0 }: {sessionDuration: number}): ReactElement {
  const { data: tasks, isSuccess, isLoading, error, refetch } = useQuery('tasks', async () => await fetchTaskList(sessionDuration), {
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    void refetch()
  }, [sessionDuration])

  if (isLoading) { return <Loading /> }

  if (error != null) { return <QueryError /> }

  if (isSuccess) {
    return (
      <VStack spacing='16px' w='full' mx='20px'>
        {
                    tasks.map((task: TaskDTO) =>
                      <TaskItem key={task._id} task={task} updateCallBack={refetch} />
                    )
                }
      </VStack>
    )
  }

  return <></>
};
