export type TaskDTO = {
    _id: string,
    name: string,
    priority: number,
    frequency_deep: number,
    duration_deep: number,
    last_executed_deep: Date,
}