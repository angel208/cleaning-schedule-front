
import { Button, useDisclosure, useToast } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { CgMathPlus } from 'react-icons/cg'
import { useMutation } from 'react-query'
import { CreateTaskProps } from '../../types/props'
import { Task } from '../../types/task'
import TaskModal from './TaskModal'
import axios, { AxiosError, AxiosResponse } from 'axios'

const createTask = async (newTask: Task): Promise<any> => {
  const baseUrl = 'http://127.0.0.1:3000/'
  const endPoint = 'task'
  return await axios.post(baseUrl + endPoint, newTask, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default function CreateButton ({ fetchCallBack }: CreateTaskProps): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const mutation = useMutation(async (newTask: Task) => {
    console.log({ newTask })
    return await createTask(newTask)
  })

  const createItem = (newTask: Task): void => {
    mutation.mutate(newTask, {
      onSuccess: (data, variables, context) => {
        toast({
          colorScheme: 'green',
          title: 'Task Created.',
          description: 'The task has been successfully created.',
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
          title: 'Task Not Created.',
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
      <Button w='full' mb={5} leftIcon={<CgMathPlus />} onClick={onOpen} colorScheme='teal' variant='solid'>
        Create
      </Button>
      <TaskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} taskToUpdate={null} callback={createItem} />
    </>
  )
};
