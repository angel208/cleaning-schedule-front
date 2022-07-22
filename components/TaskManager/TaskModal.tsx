
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { TaskModalProps } from '../../types/props'

export default function TaskModal ({ isOpen, onOpen, onClose, taskToUpdate, callback }: TaskModalProps): ReactElement {
  const [task, setTask] = React.useState(taskToUpdate)

  const handleUpdate = (): void => {
    console.log(task)
    callback(task)
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const inputVal = event.target.value
    const value = parseInt(inputVal)
    if (isNaN(value)) value = inputVal

    const newTask = ({ ...task, [event.target.name]: value }) as Task
    setTask(newTask)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Input placeholder='Task Name' size='sm' value={task?.name} onChange={handleChange} name='name' />
            <Input placeholder='Frequency' type='number' size='sm' value={task?.frequency_deep} onChange={handleChange} name='frequency_deep' />
            <Input placeholder='Duration' type='number' size='sm' value={task?.duration_deep} onChange={handleChange} name='duration_deep' />
            <Input placeholder='priority' type='number' size='sm' value={task?.priority} onChange={handleChange} name='priority' />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='solid' colorScheme='green' onClick={handleUpdate}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};
