
import { Box, Flex, HStack, Spacer, VStack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { CgStopwatch, CgUndo, CgProductHunt } from 'react-icons/cg'
import { TaskProps } from '../../types/props'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'

export default function TaskItem ({ task, updateCallBack }: TaskProps): ReactElement {
  const taskId = task._id
  const priorityMap = ['Very High', 'High', 'Medium', 'Low', 'Very Low']

  return (
    <>
      <Flex padding='6' boxShadow='lg' bg='white' w='full'>
        <VStack align='left'>
          <Box fontSize='xl'>{task.name}</Box>
          <HStack color='gray.500' spacing='16px'>
            <HStack fontSize={{ base: 'xs', md: 'sm' }}><CgStopwatch /><Box>Duration: {task.duration_deep}m</Box></HStack>
            <HStack fontSize={{ base: 'xs', md: 'sm' }}><CgUndo /><Box>Frequency: Every {task.frequency_deep} days</Box></HStack>
            <HStack fontSize={{ base: 'xs', md: 'sm' }}>
              <CgProductHunt />
              <Box>Priority: {priorityMap[task.priority]}</Box>
            </HStack>
          </HStack>
        </VStack>
        <Spacer />
        <HStack spacing={4}>
          <EditButton task={task} fetchCallBack={updateCallBack} />
          <DeleteButton taskId={taskId} fetchCallBack={updateCallBack} />
        </HStack>
      </Flex>
    </>
  )
};
