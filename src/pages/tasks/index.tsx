import React, { useState } from 'react'
import './index.scss'
import { Plus } from 'react-feather'
import TaskGroupForm from './components/form'
import { useQuery } from 'react-query'
import { getTasks } from '../../requests/queries/tasks'
import TaskKard from '../../components/taskkard'
import { useLocation } from 'react-router-dom'

function Tasks(props: any) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(0)
    //@ts-ignore
    const { state } = useLocation()
    console.log(state, 'location')

    const { data, isLoading, refetch } = useQuery(['tasks'], () =>
        getTasks({
            ...(state?.userId && { userId: state?.userId }),
            ...(state?.projectId && { projectId: state?.projectId }),
        })
    )

    const edit = (id: number) => {
        setSelectedId(id)
        setIsOpen(true)
    }
    console.log(data)
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '1rem',
                }}
            >
                <h2 className="text">Tasks</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setIsOpen(true)}
                >
                    <Plus />
                </button>
            </div>
            <div className="row gap-4 mt-4">
                {data?.map((task: any) => (
                    <TaskKard
                        key={task.id}
                        task={task}
                        edit={edit}
                        refetch={refetch}
                    />
                ))}
            </div>
            <TaskGroupForm
                state={state}
                isOpen={isOpen}
                id={selectedId}
                closeModal={() => {
                    setIsOpen(false)
                    refetch()
                }}
            />
        </div>
    )
}

export default Tasks
