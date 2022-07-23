
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { DeleteConfirmationProps } from '../../types/props'

const deleteTask = async (taskId: string): Promise<any> => {
  const baseUrl = 'http://127.0.0.1:3000/'
  const endPoint = `task/${taskId}`
  return await axios.delete(baseUrl + endPoint)
}

export default function DeleteButton ({ taskId, fetchCallBack }: DeleteConfirmationProps): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>

  const mutation = useMutation(async () => {
    return await deleteTask(taskId)
  })

  const deleteItem = (): void => {
    mutation.mutate(undefined, {
      onSuccess: (data, variables, context) => {
        toast({
          colorScheme: 'blue',
          title: 'Task Deleted.',
          description: 'The task has been successfully deleted.',
          status: 'info',
          variant: 'left-accent',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        })
        fetchCallBack()
      }
    })
  }
  return (
    <>
      <Button size={{ base: 'xs', sm: 'sm', lg: 'md' }} onClick={onOpen} colorScheme='teal' variant='outline'>
        Delete
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Task?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this task? This action is not reversible.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant='solid' colorScheme='gray' ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button variant='solid' colorScheme='red' ml={3} onClick={deleteItem}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
};
