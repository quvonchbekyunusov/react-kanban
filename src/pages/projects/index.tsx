import React, { useState } from 'react'
import ProjectsCard from '../home/components/ProjectsCard'
import { Link } from 'react-router-dom'
import ProjectForm from './components/ProjectForm'
import { useQuery } from 'react-query'
import { getProject, getProjects } from '../../requests/queries/projects'

function Projects() {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(0)

    const { data, isLoading, refetch } = useQuery(['getProjects'], getProjects)
    const edit = async (id: number) => {
        setIsOpen(true)
        setSelectedId(id)
    }
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
                <h2 className="text">Projects</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setIsOpen(true)}
                >
                    add
                </button>
            </div>
            <div className="row">
                {data?.map((project: any) => (
                    <ProjectsCard
                        editFunction={edit}
                        refetch={refetch}
                        editable
                        data={project}
                        key={project.id}
                    />
                ))}
            </div>
            <div className="modal">
                <ProjectForm
                    isOpen={isOpen}
                    id={selectedId}
                    closeModal={() => {
                        setIsOpen(false)
                        refetch()
                    }}
                />
            </div>
        </div>
    )
}

export default Projects
