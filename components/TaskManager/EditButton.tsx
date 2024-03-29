
import { Button, useDisclosure, useToast } from '@chakra-ui/react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import React, { ReactElement } from 'react'
import { CgPen } from 'react-icons/cg'
import { useMutation } from 'react-query'
import { UpdateTaskProps } from '../../types/props'
import { Task } from '../../types/task'
import TaskModal from './TaskModal'

const editTask = async (taskId: string, newTask: Task): Promise<any> => {
  const baseUrl = 'http://127.0.0.1:3000/'
  const endPoint = `task/${taskId}`
  return await axios.put(baseUrl + endPoint, newTask, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default function EditButton ({ task, fetchCallBack }: UpdateTaskProps): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const taskId = task._id

  const mutation = useMutation(async (newTask: Task) => {
    console.log({ newTask })
    return await editTask(taskId, newTask)
  })

  const updateItem = (newTask: Task): void => {
    mutation.mutate(newTask, {
      onSuccess: (data, variables, context) => {
        toast({
          colorScheme: 'green',
          title: 'Task Updated.',
          description: 'The task has been successfully updated.',
          status: 'info',
          variant: 'left-accent',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        })
        fetchCallBack()
        onClose()
      },
      onError: (error, variables, context) => {
        const e = error as AxiosError
        toast({
          colorScheme: 'red',
          title: 'Task Not Updated.',
          description: `Something went wrong: ${((e.response) as AxiosResponse).data.message as string}`,
          status: 'error',
          variant: 'left-accent',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        })
      }
    })
  }
  return (
    <>
      <Button size={{ base: 'xs', sm: 'sm', lg: 'md' }} leftIcon={<CgPen />} onClick={onOpen} colorScheme='teal' variant='solid'>
        Update
      </Button>
      <TaskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} taskToUpdate={task} callback={updateItem} />
    </>
  )
};
