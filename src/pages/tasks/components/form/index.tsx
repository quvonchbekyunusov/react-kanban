import { Field, Form, Formik, FormikProps, FormikValues } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import { useMutation, useQuery } from 'react-query'
import { TextField } from '../../../signUp/components/TextField'
import { createTask, editTask } from '../../../../requests/mutations/tasks'
import { getTask } from '../../../../requests/queries/tasks'
import UserSelect from '../../../../components/userSelect'
import ProjectSelect from '../../../../components/projectSelect'
import mockData from '../../../task/mockData'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

interface props {
    isOpen: boolean
    onAfterOpen?: () => void
    closeModal?: () => void
    id?: number
    state: {
        userId?: number
        projectId?: number
    } | null
}
function TaskGroupForm({ isOpen, onAfterOpen, closeModal, id, state }: props) {
    const ref = useRef<FormikProps<FormikValues>>(null)
    const [user, setUser] = useState(null)
    const [project, setProject] = useState(null)
    console.log(user, project)

    const { data, refetch } = useQuery(
        ['getProjects', id],
        () => getTask(id || 0),
        {
            enabled: !!id,
            onSuccess: (data) => {
                ref?.current?.setFieldValue('title', data.title)
                ref?.current?.setFieldValue('userId', data.userId)
                ref?.current?.setFieldValue('projectId', data.projectId)
                setUser(data.user)
                setProject(data.project)
            },
        }
    )
    console.log(data, 'modata, data')
    const convertToBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const handleIcon = async (e: any, setFieldValue: any) => {
        const file = e.target.files[0]
        //check the size of image
        if (file?.size / 1024 / 1024 < 2) {
            const base64 = await convertToBase64(file)
            setFieldValue('image', base64)
        }
    }

    const { mutate, isLoading } = useMutation(createTask, {
        onSuccess: closeModal,
    })
    const { mutate: eMutate, isLoading: eLoading } = useMutation(editTask, {
        onSuccess: closeModal,
    })

    useEffect(() => {
        if (state !== null) {
            if (!id && state.userId) {
                setTimeout(() => {
                    ref.current?.setFieldValue('userId', state.userId)
                }, 1)
            } else if (!id && state.projectId) {
                setTimeout(() => {
                    ref.current?.setFieldValue('projectId', state.projectId)
                }, 1)
            }
        }
    }, [id, state?.userId, state?.projectId, ref.current])

    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <Formik
                innerRef={ref}
                initialValues={{
                    title: '',
                    image: '',
                    userId: '',
                    projectId: '',
                    sections: mockData,
                }}
                onSubmit={(values) => {
                    !id
                        ? mutate({ ...values, user: user, project: project })
                        : eMutate({
                              ...values,
                              id: data.id,
                              image: data.image,
                              sections: data.sections,
                              user: user,
                              project: project,
                          })
                    // mutate(values)
                }}
            >
                {(formik) => (
                    <div
                        style={{
                            width: 500,
                            height: 500,
                        }}
                    >
                        <h1 className="my-4 font-weight-bold .display-4">
                            {!!id ? 'Edit Project' : 'Add Project'}
                        </h1>

                        <Form>
                            {!id ? (
                                <div className="mb-3 form-group">
                                    <label className="required">
                                        Upload Photo
                                    </label>
                                    <Field name="image">
                                        {({ form, field }: any) => {
                                            const { setFieldValue } = form
                                            return (
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    value={form?.value?.image}
                                                    required
                                                    onChange={(e) =>
                                                        handleIcon(
                                                            e,
                                                            setFieldValue
                                                        )
                                                    }
                                                />
                                            )
                                        }}
                                    </Field>
                                </div>
                            ) : (
                                <img
                                    className="card-img-top"
                                    src={data?.image}
                                    style={{
                                        width: '100%',
                                        height: 200,
                                        objectFit: 'cover',
                                    }}
                                    alt="test"
                                />
                            )}
                            <TextField label="Title" name="title" type="text" />
                            <Field name="userId">
                                {({ form, field }: any) => {
                                    const { setFieldValue, values } = form
                                    console.log(values, 'values')
                                    return (
                                        <UserSelect
                                            setFieldValue={setFieldValue}
                                            defaultValue={values.userId}
                                            setData={setUser}
                                        />
                                    )
                                }}
                            </Field>
                            <Field name="projectId">
                                {({ form, field }: any) => {
                                    const { setFieldValue, values } = form
                                    return (
                                        <ProjectSelect
                                            setFieldValue={setFieldValue}
                                            defaultValue={values.projectId}
                                            setData={setProject}
                                        />
                                    )
                                }}
                            </Field>
                            <button className="btn btn-dark m-3" type="submit">
                                {!!id ? 'Edit' : 'Add'}
                            </button>
                        </Form>
                    </div>
                )}
            </Formik>
        </Modal>
    )
}

export default TaskGroupForm
