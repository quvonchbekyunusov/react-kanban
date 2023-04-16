import React from 'react'
import './index.scss'
import { useQuery } from 'react-query'
import { getProjects } from '../../requests/queries/projects'

function ProjectSelect({ setFieldValue, setData, defaultValue }: any) {
    const { data, isLoading, refetch } = useQuery(['projects'], getProjects)

    return (
        <div className="mb-3 form-group">
            <label className="required">Select Project</label>
            <select
                className="custom-select"
                name="projectId"
                value={defaultValue || 0}
                onChange={(val) => {
                    setFieldValue('projectId', val.target.value)
                    setData(
                        data?.find((item: any) => item.id === +val.target.value)
                    )
                }}
            >
                <option selected>Open this select menu</option>
                {data?.map((project: any) => (
                    <option value={project.id}>{project.title}</option>
                ))}
            </select>
        </div>
    )
}

export default ProjectSelect
