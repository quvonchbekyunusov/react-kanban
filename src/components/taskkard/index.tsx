import React from 'react'
import './index.scss'
import { useMutation } from 'react-query'
import { deleteTask } from '../../requests/mutations/tasks'

function TaskKard({ task, edit, refetch, notEdit }: any) {
    const { mutate, isLoading } = useMutation(deleteTask, {
        onSuccess: () => refetch(),
    })
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img
                className="card-img-top"
                src={task?.image}
                alt="Card image cap"
            />
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                {/* <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </p> */}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    Project Title: {task.project?.title}
                </li>
                <li className="list-group-item">
                    User Name: {task.user?.firstName}
                </li>
                <li className="list-group-item">
                    User Lastname: {task.user?.lastName}
                </li>
            </ul>
            <div className="card-body card-buttons gap-4">
                <a href={`/tasks/${task.id}`} className="btn btn-primary">
                    Open
                </a>
                {!notEdit && (
                    <>
                        <button
                            className="btn btn-info ml-4"
                            onClick={() => edit(task.id)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger ml-4"
                            onClick={() => mutate(task.id)}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default TaskKard
