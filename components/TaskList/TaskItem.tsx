
import { Box, Flex, HStack, IconButton, Spacer, Spinner, VStack } from '@chakra-ui/react'
import React, { ReactElement, useState } from 'react'
import { CgStopwatch, CgUndo, CgPlayListCheck, CgCheck, CgClose } from 'react-icons/cg'
import { getDateFormatted, getExpiredDays } from '../../utils/date.utils'
import { useMutation } from 'react-query'
import { motion } from 'framer-motion'
import { TaskProps } from '../../types/props'

const patchTaskAsDone = async (taskId: string): Promise<any> => {
  const baseUrl = 'http://127.0.0.1:3000/'
  const endPoint = `task/${taskId}/done`
  return await fetch(baseUrl + endPoint, {
    method: 'PATCH'
  })
}

const calculateExpiryColor = (frequency: number, daysExpired: number): string => {
  if (daysExpired < 0) { return Math.abs(daysExpired) / frequency > 0.3 ? 'green.400' : '' } else { return 'red.400' }
}

export default function TaskItem ({ task, updateCallBack }: TaskProps): ReactElement {
  const [done, setDone] = useState(false)
  const taskId = task._id
  const daysExpired = getExpiredDays(task.last_executed_deep, task.frequency_deep)

  const mutation = useMutation(async () => {
    return await patchTaskAsDone(taskId)
  })

  const markTaskAsDone = (): void => {
    if (!done) {
      mutation.mutate(undefined, {
        onSuccess: (data, variables, context) => {
          updateCallBack()
          setDone(true)
        }
      })
    }
  }

  return (
    <>

      <motion.div animate={done ? { x: [0, 75, 0] } : {}} style={{ width: '100%' }} layout>

        <Flex padding='6' boxShadow='lg' bg='white' w='full'>
          <VStack align='left'>
            <Box fontSize='xl'>{task.name}</Box>
            <HStack color='gray.500' spacing='16px'>
              <HStack fontSize={{ base: 'xs', md: 'sm' }}><CgStopwatch /><Box>{task.duration_deep}m</Box></HStack>
              <HStack fontSize={{ base: 'xs', md: 'sm' }}><CgUndo /><Box>Every {task.frequency_deep} days</Box></HStack>
              <HStack fontSize={{ base: 'xs', md: 'sm' }} color={`${calculateExpiryColor(task.frequency_deep, daysExpired)}`}>
                <CgPlayListCheck />
                <Box>{getDateFormatted(task.last_executed_deep)}</Box>
                {daysExpired < 0 ? <CgCheck /> : <CgClose size={12} />}
              </HStack>
            </HStack>
          </VStack>

          {mutation.isError
            ? (
              <div>An error occurred</div>
              )
            : null}

          <Spacer />
          {
                    mutation.isLoading
                      ? <Box display='flex'><Spinner my='auto' /></Box>
                      : <IconButton
                          aria-label='Search database'
                          size='md'
                          icon={<CgCheck size={24} />}
                          onClick={() => markTaskAsDone()}
                          variant={`${!done ? 'outline' : 'solid'}`}
                          colorScheme='green'
                          isDisabled={!!done}
                          px={0}
                        />
                }

        </Flex>

      </motion.div>

    </>
  )
};
