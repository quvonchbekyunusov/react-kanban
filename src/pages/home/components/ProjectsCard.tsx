import React from 'react'
import { useMutation } from 'react-query'
import { deleteProject } from '../../../requests/mutations/projects'
import { useNavigate, useNavigation } from 'react-router-dom'

const nonImage =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAABzCAMAAAA7bLlqAAAAY1BMVEX///9NTU1DQ0NHR0f6+vpKSkpiYmLu7u48PDyVlZVtbW28vLzW1tZAQEA5OTnr6+vd3d2IiIjKyspnZ2dbW1szMzOwsLD09PR4eHiCgoJUVFSOjo4uLi6ioqLDw8OcnJwnJyeNKYXoAAAD2UlEQVR4nO2ba3ejIBBAI0hiElGjRhvz2v//K9dmUx8EYUaQes5yv7Y0t8gwM2A2G4/H4/F4PP8P4apQiF5v0WpItgrRPQ9WAz2oREkQsFWgF2XldgWUelFS1btfp86pXvSo+LkzYr0o96IYvKhtvKhtfkU0zfNMVWDIcC9a35vbObklpww1zLloXL7LHBJUqHGORTNCf4ohdsOYOhYNCRvUbVEOH+lYtIpGBWYBH+lWtN6OS2ESg4e6Fc2oIApfpW5F40QQ3cOHOhXNRdEreKjjRy+0iuQOHupWdFeysegDPNTx9vTd1PawBp7xHYumf4aiCSI1uU6hx8Eq5SfEQOdFScXfeynjX5hx7su8uDhzSvgZVzz9SuGcVs/rPW/jCFM8+1bENl7UNl7UNpZF94guCIdd0YpHqbmTFKuiMW/7tdqClexvWxTNgrbaxGVwOBZF6/JVbpCnFTERi6Knd1GcPHBZHIY90X13tkCWCH1rose+yWDBAqFvSzQ+D1oMWqz20WfNqL0kF2uCP1gS3QpnNRzesAOxI3ohgcDZdoFgRfQuuStnsd09yoboUXanz4KdTU8bouIRXRf6VrO+uWgqnCf1AQU/qnMhGhYfgdSZ2sz6pqLhadKzDX34Yd0m1iwUU9Hx7YEYUBR86ZWRi3qTMBSVBvzAFJr104BxdTYzEQ03GZ8IpB/oAbSZvkpZ9YG+0YymjcYTGPp18crAiSrvGs3ogeo8QVk/PBD975qIXhUB36O9RxxsHMn0NmEgej+r/Hp013OnQWZLJpfZTNE2RB6g+WyhW2Xoj+4fGJua/9kzmhJtIHVTqvqAavxcWDSx9c4VnczwMhS3CvePhEHlK2Xuo/+CPvh/ptLz+lCaMGgjXSkzRU/I10oT+dJ7yCpEWspM54lW8hJ0GsZkSy9n0vVDC0nNPUs0Rz3394d/VkeTCVgWfXNExTtiEOTjtYyYTsYj//ooEWaI1mJvDCN6jo+k0lLxZ8jHPoEXRQb8wHQU+juVZzunYimFF8UGfM/w8GxXaB5LIvQxaNEjMMNLGJbRB+1jEfZerOhD1XrooNt36IOWz5/RBCFFX6ffBqbvj7qCls9ohnCi4byA74lepTHw6xJsWCCiRGcHfM/32xlPaF5jUW+KEt0be34XRxW8QKRll3kxokdshpfBAsx/S7uNAiE6I8PLTTF07QFcFNAbLwE51DjRsDEM+Nmm2xAjqjwMWxb+OpWCiu5NMpIh0QUmSqpdqjy0Wxx+TdOHXjRoSkzLuQCMliXgG2LYHWUx9KIrQSl6TchqiBBvw3s8Ho/H4/G44i/5tkshp0FTWQAAAABJRU5ErkJggg=='

interface props {
    editable?: boolean
    refetch?: () => void
    editFunction?: (id: number) => Promise<void>
    data: {
        id: number
        title: string
        description: string
        image: string
    }
}

function ProjectsCard({ data, editable, refetch, editFunction }: props) {
    const navigate = useNavigate()
    const { mutate, isLoading } = useMutation(deleteProject, {
        onSuccess: refetch,
    })
    return (
        <div
            className="card"
            style={{
                width: '18rem',
            }}
        >
            <img
                className="card-img-top"
                src={data?.image ? data.image : nonImage}
                alt="Card image cap"
                style={{
                    width: '100%',
                    height: 150,
                    objectFit: 'cover',
                }}
            />
            <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.description}</p>
                <button
                    onClick={() =>
                        navigate('/tasks', {
                            //@ts-ignore
                            state: {
                                projectId: data?.id,
                            },
                        })
                    }
                    className="btn btn-primary"
                >
                    Go To Tasks
                </button>
            </div>
            {editable && (
                <div className="row p-2">
                    {editFunction && (
                        <button
                            className="btn btn-primary mb-2"
                            onClick={() => editFunction(data.id)}
                        >
                            edit
                        </button>
                    )}{' '}
                    <button
                        className="btn btn-danger"
                        onClick={() => mutate(data?.id)}
                    >
                        delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProjectsCard
