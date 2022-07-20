import React from 'react'
import { useQuery } from "react-query";
import Loading from './Loading';
import QueryError from './QueryError';
import { TaskDTO } from './TaskDTO';
import TaskItem from './TaskItem';
import { Stack, VStack } from '@chakra-ui/react'

const fetchTaskList = async (availableTime: number) =>{
    const baseUrl = 'http://127.0.0.1:3000/'
    const endPoint = availableTime > 0 ?  `cleaning-session?availableTime=${availableTime}` : `cleaning-session`
    const data = await fetch(baseUrl+endPoint)
    return data.json();
}



export default function TaskList({ availableTime = 0 } : {availableTime:number}) {
    const {data: tasks, isSuccess, isLoading, error, refetch} = useQuery('tasks', () => fetchTaskList(availableTime), {
        refetchOnWindowFocus: false,
    });

    if(isLoading)
        return <Loading></Loading>

    if(error)
        return <QueryError></QueryError>

    if(isSuccess)
        return (
            <VStack spacing='16px' w="full" mx="20px">
                {
                    tasks.map( (task:TaskDTO) => 
                        <TaskItem key={task._id} task={task} updateCallBack={refetch} ></TaskItem>
                    )
                }
            </VStack>
        )
    
    return <></>
};
