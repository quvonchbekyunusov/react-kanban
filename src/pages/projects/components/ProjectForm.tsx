import { Field, Form, Formik, FormikProps, FormikValues } from 'formik'
import React, { useRef } from 'react'
import Modal from 'react-modal'
import { TextField } from '../../signUp/components/TextField'
import { useMutation, useQuery } from 'react-query'
import {
    createProject,
    editProject,
} from '../../../requests/mutations/projects'
import { getProject } from '../../../requests/queries/projects'
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
}
function ProjectForm({ isOpen, onAfterOpen, closeModal, id }: props) {
    const ref = useRef<FormikProps<FormikValues>>(null)

    const { data, refetch } = useQuery(
        ['getProjects', id],
        () => getProject(id || 0),
        {
            enabled: !!id,
            onSuccess: (data) => {
                ref?.current?.setFieldValue('title', data.title)
                ref?.current?.setFieldValue('description', data.description)
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

    const { mutate, isLoading } = useMutation(createProject, {
        onSuccess: closeModal,
    })
    const { mutate: eMutate, isLoading: eLoading } = useMutation(editProject, {
        onSuccess: closeModal,
    })

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
                    title: data?.title || '',
                    description: data?.description || '',
                    image: data?.image || '',
                }}
                onSubmit={(values) => {
                    !!id
                        ? eMutate({
                              id: id,
                              image: data?.image,
                              title: values.title,
                              description: values.description,
                          })
                        : mutate(values)
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
                                    alt="test"
                                    style={{
                                        width: '100%',
                                        height: 200,
                                        objectFit: 'cover',
                                    }}
                                />
                            )}
                            <TextField label="Title" name="title" type="text" />
                            <TextField
                                label="Description"
                                name="description"
                                type="text"
                            />
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

export default ProjectForm
