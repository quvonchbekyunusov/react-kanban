import React from 'react'
import { LogOut } from 'react-feather'
import logo from '../../assets/table.png'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    const user = async () => {
        const response = await JSON.parse(
            localStorage.getItem('user') as string
        )
        return response.id
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button> */}

                {/* <div
                    className="  navbar-collapse"
                    id="navbarSupportedContent"
                > */}
                <a className="navbar-brand mt-2 mt-lg-0" href="/">
                    <img src={logo} height="30" alt="MDB Logo" loading="lazy" />
                </a>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="/projects">
                            Projects
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/tasks">
                            Tasks
                        </a>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link btn"
                            onClick={() =>
                                navigate('/tasks', {
                                    state: {
                                        userId: user(),
                                    },
                                })
                            }
                        >
                            My Tasks
                        </button>
                    </li>
                </ul>
                {/* </div> */}

                <div className="d-flex align-items-center">
                    <a className="text-reset me-3" href="/signin">
                        <LogOut />
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
