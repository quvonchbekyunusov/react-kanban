import React, { useState } from 'react'
import { Check, Plus, X } from 'react-feather'
import './addsection.scss'
import { v4 as uuidv4 } from 'uuid'

interface props {
    setData: React.Dispatch<React.SetStateAction<any>>
}
function AddSection(props: props) {
    const [editable, setEditable] = useState(false)
    const [title, setTitle] = useState('')
    const done = () => {
        props.setData((prev: any) => [
            ...prev,
            { id: uuidv4(), title: title, tasks: [] },
        ])
        setEditable(false)
    }
    return (
        <div>
            {editable ? (
                <div className="addsection section kanban__section__title">
                    <input
                        value={title}
                        onChange={(val) => setTitle(val.target.value)}
                        className="section__title__input"
                    />
                    <div>
                        <Check className="icon1" onClick={done} />
                        <X onClick={() => setEditable(false)} />
                    </div>
                </div>
            ) : (
                <button
                    className="btn btn-dark kanbanbtn"
                    onClick={() => setEditable(true)}
                >
                    <Plus />
                </button>
            )}
        </div>
    )
}

export default AddSection
