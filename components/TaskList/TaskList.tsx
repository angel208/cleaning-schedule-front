import React from 'react'
import { useQuery } from "react-query";
import Loading from './Loading';
import QueryError from './QueryError';
import { TaskDTO } from './TaskDTO';
import TaskItem from './TaskItem';
import { Stack, VStack } from '@chakra-ui/react'

const fetchTaskList = async () =>{
    const data = await fetch('http://127.0.0.1:3000/cleaning-session')
    return data.json();
}



export default function TaskList() {
    const {data: tasks, isLoading, error} = useQuery('tasks', () => fetchTaskList());

    if(isLoading)
        return <Loading></Loading>

    if(error)
        return <QueryError></QueryError>

    return (
        <VStack spacing='16px' w="full" mx="20px">
            {
                tasks.map( (task:TaskDTO) => 
                    <TaskItem key={task._id} task={task} ></TaskItem>
                )
            }
        </VStack>
    )
};
