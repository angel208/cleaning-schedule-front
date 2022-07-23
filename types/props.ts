import { Task } from './task'
import { IconType } from 'react-icons'
import { MouseEventHandler } from 'react'

export interface LayoutProps {
  children: React.ReactNode
}

export interface TaskProps {
  task: Task
  updateCallBack: Function
}

export interface DeleteConfirmationProps {
  taskId: string
  fetchCallBack: Function
}

export interface UpdateTaskProps {
  task: Task
  fetchCallBack: Function
}

export interface CreateTaskProps {
  fetchCallBack: Function
}

export interface TaskModalProps {
  isOpen: boolean
  onOpen: MouseEventHandler<HTMLButtonElement>
  onClose: Function
  taskToUpdate: Task | null
  callback: Function
}

export interface TaskScheduleProps {
  sessionDuration: number
}

export interface SidebarButtonProps {
  Icon: IconType
  route: string
}

export interface SocialButtonProps {
  children: React.ReactNode
  label: string
  href: string
}
