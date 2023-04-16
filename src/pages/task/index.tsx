import { useParams } from 'react-router-dom'
import Kanban from './components/kanban'
import { useQuery } from 'react-query'
import { getTask } from '../../requests/queries/tasks'

function Tasks() {
    const { id } = useParams()
    console.log(id, 'params')

    return (
        <div className="row" style={{ padding: '50px' }}>
            {/* <h1 style={{ marginBottom: '20px' }}>Kanban UI</h1> */}
            <Kanban id={id ? +id : 0} />
        </div>
    )
}

export default Tasks
