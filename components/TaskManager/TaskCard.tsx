
import { Box, Flex, HStack, Spacer, Stack, VStack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { CgStopwatch, CgUndo, CgProductHunt } from 'react-icons/cg'
import { TaskProps } from '../../types/props'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'

export default function TaskItem ({ task, updateCallBack }: TaskProps): ReactElement {
  const taskId = task._id
  const priorityMap = ['Default', 'Very High', 'High', 'Medium', 'Low', 'Very Low']

  return (
    <>
      <Flex direction={{ base: 'column', sm: 'row' }} padding='6' boxShadow='lg' bg='white' w='full'>
        <VStack align='left'>
          <Box fontSize='xl'>{task.name}</Box>
          <Stack direction={{ base: 'column', sm: 'row' }} color='gray.500' spacing='16px'>
            <HStack fontSize={{ base: 'xs', md: 'sm' }}>
              <Box display={{ base: 'none', lg: 'block' }}><CgStopwatch /></Box>
              <Box>Duration: {task.duration_deep}m</Box>
            </HStack>
            <HStack fontSize={{ base: 'xs', sm: 'sm' }}>
              <Box display={{ base: 'none', lg: 'block' }}><CgUndo /></Box>
              <Box>Frequency: Every {task.frequency_deep} days</Box>
            </HStack>
            <HStack fontSize={{ base: 'xs', sm: 'sm' }}>
              <Box display={{ base: 'none', lg: 'block' }}><CgProductHunt /></Box>
              <Box>Priority: {priorityMap[task.priority]}</Box>
            </HStack>
          </Stack>
        </VStack>
        <Spacer />
        <Stack direction={{ base: 'column', md: 'row' }} mt={{ base: '5', md: '0' }} spacing={4} justifyContent='center'>
          <EditButton task={task} fetchCallBack={updateCallBack} />
          <DeleteButton taskId={taskId} fetchCallBack={updateCallBack} />
        </Stack>
      </Flex>
    </>
  )
};
