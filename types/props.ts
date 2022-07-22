import { Task } from './task'
import { IconType } from 'react-icons'

export interface LayoutProps {
  children: React.ReactNode
}

export interface TaskProps {
  task: Task
  updateCallBack: Function
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
