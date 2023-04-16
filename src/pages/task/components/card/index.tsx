import React, { Children, useState } from 'react'
import './card.scss'
import { Check, Edit2, Trash2, X } from 'react-feather'
interface props {
    sectionId: string
    task: any
    setData: React.Dispatch<React.SetStateAction<any>>
}

function Card(props: props) {
    console.log(props)
    const [editable, setEditable] = useState(false)
    const [title, setTitle] = useState(props.task.title)
    const done = () => {
        props.setData((prev: any) =>
            prev.map((item: any) =>
                item.id === props.sectionId
                    ? {
                          ...item,
                          tasks: item.tasks.map((task: any) =>
                              task.id === props.task.id
                                  ? { ...task, title: title }
                                  : task
                          ),
                      }
                    : item
            )
        )
        setEditable(false)
    }
    const deleteItem = () => {
        props.setData((prev: any) => {
            // return prev.filter((item: any) => item.id !== props.task.id)
            return prev.map((item: any) =>
                item.id === props.sectionId
                    ? {
                          ...item,
                          tasks: item.tasks.filter(
                              (task: any) => task.id !== props.task.id
                          ),
                      }
                    : item
            )
        })
    }
    return (
        <div className="cards">
            {editable ? (
                <div className="cards__content">
                    <div className="cards__content__icons">
                        <Check className="icon1" onClick={done} />
                        <X onClick={() => setEditable(false)} />
                    </div>
                    <input
                        value={title}
                        onChange={(val) => setTitle(val.target.value)}
                        className="cards__content__input"
                    />
                </div>
            ) : (
                <div className="cards__content">
                    <div className="cards__content__icons">
                        <Edit2
                            className="icon1"
                            onClick={() => setEditable(true)}
                        />
                        <Trash2 onClick={deleteItem} />
                    </div>
                    {props.task.title}
                </div>
            )}
        </div>
    )
}

export default Card
