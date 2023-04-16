import React from 'react'
import ProjectsCard from './components/ProjectsCard'
import UserCard from './components/UserCard'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getUsers } from '../../requests/queries/users'
import { getProjects } from '../../requests/queries/projects'
import { getTasks } from '../../requests/queries/tasks'
import { ArrowRight } from 'react-feather'
import TaskKard from '../../components/taskkard'

function Home() {
    const { data, isLoading, refetch } = useQuery(['users'], () => getUsers({}))
    const {
        data: pData,
        isLoading: pLoading,
        refetch: pRefetch,
    } = useQuery(['getProjects'], getProjects)
    const {
        data: tData,
        isLoading: tLoading,
        refetch: tRefetch,
    } = useQuery(['getTasks'], getTasks)

    console.log(tData)

    return (
        <div>
            <div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '1rem',
                        justifyContent: 'space-between',
                    }}
                >
                    <h2 className="text">Projects</h2>
                    <Link to="projects">
                        All <ArrowRight />
                    </Link>
                </div>

                <div className="row flex-row flex-nowrap overflow-scroll gap-4">
                    {pData?.map((project: any) => (
                        <ProjectsCard data={project} key={project.id} />
                    ))}
                </div>
            </div>

            <div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '1rem',
                        justifyContent: 'space-between',
                    }}
                >
                    <h2 className="text">Users</h2>
                </div>
                <div className="row flex-row flex-nowrap overflow-scroll gap-4">
                    {data?.map((user: any) => (
                        <UserCard data={user} key={user.id} />
                    ))}
                </div>
            </div>

            <div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '1rem',
                        justifyContent: 'space-between',
                    }}
                >
                    <h2 className="text">Tasks</h2>
                    <a href="/tasks">
                        All <ArrowRight />
                    </a>
                </div>
                <div className="row flex-row flex-nowrap overflow-scroll gap-4">
                    {tData?.map((task: any) => (
                        <TaskKard notEdit task={task} key={task.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
