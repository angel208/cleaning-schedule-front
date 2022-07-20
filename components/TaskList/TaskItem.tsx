
import { Box, Checkbox, Fade, Flex, HStack, IconButton, ScaleFade, Spacer, Spinner, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { TaskDTO } from './TaskDTO'
import { CgStopwatch, CgUndo, CgBrush, CgCheck } from 'react-icons/cg';
import  getDateFormatted  from '../../utils/date.utils';
import { useMutation } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskProps {
    task: TaskDTO;
    updateCallBack: Function;
}

const patchTaskAsDone = async (taskId: string) =>{
    const baseUrl = 'http://127.0.0.1:3000/'
    const endPoint = `task/${taskId}/done`
    return fetch(baseUrl + endPoint, {
        method: 'PATCH',
    })
}

export default function TaskItem({ task, updateCallBack } : TaskProps) {
    const [done, setDone] = useState(false)
    const taskId = task._id;

    const mutation = useMutation( () => {
        return patchTaskAsDone(taskId)
    })

    const markTaskAsDone = () =>{
        if(!done){
            mutation.mutate( undefined , {
                onSuccess: (data, variables, context) => {
                    updateCallBack()
                    setDone(true);
                }
            }) 
            
        }
    }

    return (
       <>
      
        <motion.div animate={ done ? { x:[0, 75, 0] } : {}} style={{width: '100%'}} layout > 

            <Flex padding='6' boxShadow='lg' bg='white' w='full'>
                <VStack  align={'left'}>
                    <Box fontSize={'xl'}>{task.name}</Box>
                    <HStack color={'gray.500'} spacing='16px'>
                        <HStack fontSize={{ base: 'xs', md: 'sm' }} ><CgStopwatch /><Box>{task.duration_deep}m</Box></HStack>
                        <HStack fontSize={{ base: 'xs', md: 'sm' }}><CgUndo /><Box>Every {task.frequency_deep} days</Box></HStack>
                        <HStack fontSize={{ base: 'xs', md: 'sm' }}><CgBrush /><Box>{getDateFormatted(task.last_executed_deep as Date)}</Box></HStack>
                    </HStack>
                </VStack>
                
                {mutation.isError ? (
                        <div>An error occurred</div>
                ) : null}
                
                
                <Spacer />
                {
                    mutation.isLoading ? 
                    <Box display={"flex"}><Spinner my={"auto"} /></Box> :
                    <IconButton 
                        aria-label='Search database' 
                        size='md' 
                        icon={<CgCheck size={24} />} 
                        onClick={() => markTaskAsDone()}  
                        variant={`${!done ? 'outline':'solid'}`} 
                        colorScheme='green'
                        isDisabled={done ? true:false}
                        px={0}
                    />
                }

            </Flex>

        </motion.div>

    </>
    )
};