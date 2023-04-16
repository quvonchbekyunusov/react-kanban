import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'

interface props {
    data: {
        email: string
        firstName: string
        id: number
        lastName: string
    }
}

function UserCard({ data }: props) {
    const navigate = useNavigate()
    return (
        <div
            //@ts-ignore
            onClick={() =>
                navigate('/tasks', {
                    state: {
                        userId: data.id,
                    },
                })
            }
            className="card profile-card-1"
            style={{ width: '18rem' }}
        >
            <img
                src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg?w=500&h=650&auto=compress&cs=tinysrgb"
                alt="profile-sample1"
                className="background"
            />
            <img
                src="https://randomuser.me/api/portraits/men/64.jpg"
                alt="profile-image"
                className="profile"
            />
            <div className="card-content">
                <h3>{`${data.firstName} ${data?.lastName} `}</h3>
                <small>{data?.email}</small>
            </div>
        </div>
    )
}

export default UserCard
