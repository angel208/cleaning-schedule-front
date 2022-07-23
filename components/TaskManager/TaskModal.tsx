
import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { TaskModalProps } from '../../types/props'
import { Task } from '../../types/task'

export default function TaskModal ({ isOpen, onClose, taskToUpdate, callback }: TaskModalProps): ReactElement {
  const [task, setTask] = React.useState(taskToUpdate)

  const handleUpdate = (): void => {
    console.log(task)
    callback(task)
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const inputVal = (event.target as HTMLTextAreaElement).value
    const inputName = (event.target as HTMLTextAreaElement).name

    let value: number|string = parseInt(inputVal)
    if (isNaN(value)) { value = inputVal }

    const newTask = { ...task, [inputName]: value }
    setTask(newTask as Task)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose as () => void}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Box>Name:</Box>
            <Input placeholder='Task Name' size='sm' value={(task?.name != null) ? task.name : ''} onChange={handleChange} name='name' />
            <Box>Duration (Minutes):</Box>
            <Input placeholder='Duration' type='number' size='sm' value={(task?.duration_deep != null) ? task.duration_deep : ''} onChange={handleChange} name='duration_deep' />
            <Box>Frequency (Days):</Box>
            <Input placeholder='Frequency' type='number' size='sm' value={(task?.frequency_deep != null) ? task.frequency_deep : ''} onChange={handleChange} name='frequency_deep' />
            <Box>Priority:</Box>
            <Select isRequired size='sm' value={(task?.priority != null) ? task.priority : ''} onChange={handleChange} name='priority'>
              <option value='1'>Very High</option>
              <option value='2'>High</option>
              <option value='3'>Medium</option>
              <option value='4'>Low</option>
              <option value='5'>Very Low</option>
            </Select>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant='outline' mr={3} onClick={onClose as React.MouseEventHandler<HTMLButtonElement>}>
            Close
          </Button>
          <Button variant='solid' colorScheme='green' onClick={handleUpdate}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};
