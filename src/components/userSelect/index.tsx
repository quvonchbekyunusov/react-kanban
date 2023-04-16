import React from 'react'
import './index.scss'
import { useQuery } from 'react-query'
import { getUsers } from '../../requests/queries/users'

function UserSelect({ setFieldValue, setData, defaultValue }: any) {
    const { data, isLoading, refetch } = useQuery(['users'], getUsers)
    return (
        <div className="mb-3 form-group">
            <label className="required">Select User</label>
            <select
                className="custom-select"
                name="userId"
                value={defaultValue || 0}
                onChange={(val) => {
                    setFieldValue('userId', val.target.value)
                    setData(data?.find((v: any) => v.id === +val.target.value))
                }}
            >
                <option selected>Open this select menu</option>
                {data?.map((user: any) => (
                    <option value={user.id}>
                        {user.firstName + ' ' + user.lastName}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default UserSelect
