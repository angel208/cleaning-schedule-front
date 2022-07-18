
import { Box, Checkbox, Flex, HStack, Spacer, VStack } from '@chakra-ui/react';
import React from 'react'
import { TaskDTO } from './TaskDTO'
import { CgStopwatch, CgUndo, CgBrush, CgCheck } from 'react-icons/cg';
import  getDateFormatted  from '../../utils/date.utils';

interface TaskProps {
    task: TaskDTO;
}

export default function TaskItem({ task } : TaskProps) {
    return (
        <Flex padding='6' boxShadow='lg' bg='white' w='full'>
            <VStack  align={'left'}>
                <Box fontSize={'xl'}>{task.name}</Box>
                <HStack color={'gray.500'} spacing='16px'>
                    <HStack fontSize={{ base: 'xs', md: 'sm' }} ><CgStopwatch /><Box>{task.duration_deep}m</Box></HStack>
                    <HStack fontSize={{ base: 'xs', md: 'sm' }}><CgUndo /><Box>Every {task.frequency_deep} days</Box></HStack>
                    <HStack fontSize={{ base: 'xs', md: 'sm' }}><CgBrush /><Box>{getDateFormatted(task.last_executed_deep as Date)}</Box></HStack>
                </HStack>
            </VStack>
            

            <Spacer />
            <Checkbox colorScheme='green' size='lg'></Checkbox>
        </Flex>
    )
};