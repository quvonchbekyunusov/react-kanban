import React, { useEffect, useState } from 'react'
import './kanban.scss'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockData from '../../mockData'
import Card from '../card'
import Section from '../section'
import AddTask from '../addTask'
import AddSection from '../addsection'
import { useMutation, useQuery } from 'react-query'
import { getTask } from '../../../../requests/queries/tasks'
import { editTask } from '../../../../requests/mutations/tasks'
interface props {
    id: number
}

function Kanban({ id }: props) {
    const [data, setData] = useState(mockData)
    const {
        data: fData,
        isLoading,
        refetch,
    } = useQuery(['getTask', id], () => getTask(id ? +id : 0), {
        enabled: id > 0,
        onSuccess: (data) => {
            setData(data?.sections)
        },
    })

    const { mutate } = useMutation(editTask, {
        onSuccess: () => {
            refetch()
        },
    })
    useEffect(() => {
        mutate({
            ...fData,
            sections: data,
        })
    }, [data])
    console.log(fData, 'fetching data')
    const onDragEnd = (result: any) => {
        console.log(result)
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = data.findIndex(
                (e) => e.id === source.droppableId
            )
            const destinationColIndex = data.findIndex(
                (e) => e.id === destination.droppableId
            )

            const sourceCol = data[sourceColIndex]
            const destinationCol = data[destinationColIndex]

            const sourceTask = [...sourceCol.tasks]
            const destinationTask = [...destinationCol.tasks]

            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)

            data[sourceColIndex].tasks = sourceTask
            data[destinationColIndex].tasks = destinationTask

            setData(data)
            mutate({
                ...fData,
                sections: data,
            })
        }
    }
    return (
        <div className="container_kanban">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="kanban">
                    {data.map((section: any, index: number) => (
                        <Droppable key={section.id} droppableId={section.id}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    className="kanban__section"
                                    ref={provided.innerRef}
                                >
                                    <Section
                                        section={section}
                                        setData={setData}
                                    />
                                    <AddTask
                                        sectionId={section.id}
                                        setData={setData}
                                    />
                                    <div className="kanban__section__content">
                                        {section.tasks.map(
                                            (task: any, index: number) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided
                                                                    .draggableProps
                                                                    .style,
                                                                opacity:
                                                                    snapshot.isDragging
                                                                        ? '0.5'
                                                                        : '1',
                                                            }}
                                                        >
                                                            <Card
                                                                sectionId={
                                                                    section.id
                                                                }
                                                                setData={
                                                                    setData
                                                                }
                                                                task={task}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        )}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            <AddSection setData={setData} />
        </div>
    )
}

export default Kanban
