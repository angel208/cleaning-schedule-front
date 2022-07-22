
import { Button, useDisclosure, useToast } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { CgPen } from 'react-icons/cg'
import { useMutation } from 'react-query'
import { UpdateTaskProps } from '../../types/props'
import { Task } from '../../types/task'
import TaskModal from './TaskModal'

const editTask = async (taskId: string, newTask: Task): Promise<any> => {
  const baseUrl = 'http://127.0.0.1:3000/'
  const endPoint = `task/${taskId}`
  return await fetch(baseUrl + endPoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
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
      }
    })
  }
  return (
    <>
      <Button leftIcon={<CgPen />} onClick={onOpen} colorScheme='teal' variant='solid'>
        Update
      </Button>
      <TaskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} taskToUpdate={task} callback={updateItem} />
    </>
  )
};
