import React, { useState } from 'react'
import { Edit2, Trash2, Check, X } from 'react-feather'
import './section.scss'

interface props {
    setData: React.Dispatch<React.SetStateAction<any>>
    section: any
}

function Section(props: props) {
    const [editable, setEditable] = useState(false)
    const [title, setTitle] = useState(props.section.title)
    const done = () => {
        props.setData((prev: any) =>
            prev.map((item: any) =>
                item.id === props.section.id ? { ...item, title: title } : item
            )
        )
        setEditable(false)
    }
    const deleteItem = () => {
        props.setData((prev: any) => {
            return prev.filter((item: any) => item.id !== props.section.id)
        })
    }
    return (
        <div>
            {editable ? (
                <div className="kanban__section">
                    <div className="section kanban__section__title">
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
                </div>
            ) : (
                <div className="section kanban__section__title">
                    {props.section.title}
                    <div>
                        <Edit2
                            className="icon1"
                            onClick={() => setEditable(true)}
                        />
                        <Trash2 onClick={deleteItem} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Section
