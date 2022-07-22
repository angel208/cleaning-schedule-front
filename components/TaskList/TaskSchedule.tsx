import React, { ReactElement, useEffect } from 'react'
import { useQuery } from 'react-query'
import Loading from './Loading'
import QueryError from './QueryError'
import TaskItem from './TaskItem'
import { VStack } from '@chakra-ui/react'
import { Task } from '../../types/task'
import { TaskScheduleProps } from '../../types/props'

const fetchTaskList = async (availableTime: number): Promise<any> => {
  const baseUrl = 'http://127.0.0.1:3000/'
  const endPoint = availableTime > 0 ? `cleaning-session?availableTime=${availableTime}` : 'cleaning-session'
  const data = await fetch(baseUrl + endPoint)
  return await data.json()
}

export default function TaskSchedule ({ sessionDuration = 0 }: TaskScheduleProps): ReactElement {
  const { data: tasks, isSuccess, isLoading, error, refetch } = useQuery('task-schedule', async () => await fetchTaskList(sessionDuration), {
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
                    tasks.map((task: Task) =>
                      <TaskItem key={task._id} task={task} updateCallBack={refetch} />
                    )
                }
      </VStack>
    )
  }

  return <></>
};
