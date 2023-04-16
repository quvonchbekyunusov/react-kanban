import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams,
    Routes,
} from 'react-router-dom'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Home from './pages/home'
import Projects from './pages/projects'
import { useQueryClient, QueryClient, QueryClientProvider } from 'react-query'
import Tasks from './pages/task'
import TaskGroup from './pages/tasks'
import Navbar from './components/navbar'

// Create a client
const queryClient = new QueryClient()

// Params are placeholders in the URL that begin
// with a colon, like the `:id` param defined in
// the route in this example. A similar convention
// is used for matching dynamic segments in other
// popular web frameworks like Rails and Express.

export default function ParamsExample() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="p-4">
                    <Navbar />
                    <Routes>
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/tasks/:id" element={<Tasks />} />
                        <Route path="/tasks" element={<TaskGroup />} />
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    )
}

function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams()

    return (
        <div>
            <h3>ID: {id}</h3>
        </div>
    )
}
