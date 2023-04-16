import React, { useState } from 'react'
import { Check, Plus, X } from 'react-feather'
import './addtask.scss'
import { v4 as uuidv4 } from 'uuid'

interface props {
    sectionId: string
    setData: React.Dispatch<React.SetStateAction<any>>
}

function AddTask(props: props) {
    const [editable, setEditable] = useState(false)
    const [title, setTitle] = useState('')

    const done = () => {
        props.setData((prev: any) =>
            prev.map((item: any) =>
                item.id === props.sectionId
                    ? {
                          ...item,
                          tasks: [
                              { id: uuidv4(), title: title },
                              ...item.tasks,
                          ],
                      }
                    : item
            )
        )

        setEditable(false)
    }

    return (
        <div>
            {editable ? (
                <div className="cards">
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
                </div>
            ) : (
                <div onClick={() => setEditable(true)} className="addbtn">
                    <Plus />
                </div>
            )}
        </div>
    )
}

export default AddTask
