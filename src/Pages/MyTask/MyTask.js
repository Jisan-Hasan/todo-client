import { Button, Label, Modal, Table, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever, MdFileDownloadDone } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthProvider";

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_API_URL}/task/${user?.email}?isComplete=false`
        )
            .then((res) => res.json())
            .then((data) => {
                setTasks(data.data);
            });
    }, [user, refresh]);

    const handleComplete = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/task/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ isCompleted: true }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    toast.success("Successfully Complete A Task!");
                    setRefresh(!refresh);
                }
            });
    };

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/task/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    toast.success("Task Deleted Successfully");
                    setRefresh(!refresh);
                }
            });
    };

    // handle edit category
    const handleEdit = (id) => {
        // get category for edit
        fetch(`${process.env.REACT_APP_API_URL}/singleTask/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setSelectedTask(data.data);
                    setUpdateModal(true);
                }
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setUpdateModal(false);

        const updatedTask = { title: e.target.title.value };
        fetch(`${process.env.REACT_APP_API_URL}/task/${selectedTask._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setRefresh(!refresh);
                    toast.success("Task Updated Successfully!");
                }
            })
            .catch((err) => {
                toast.error("Can't Update! Try Again.");
            });
    };

    if (!tasks.length) {
        return (
            <div className="flex justify-center items-center w-full h-[80vh] dark:text-white">
                <p className="font-bold text-2xl">No Task Remaining</p>
            </div>
        );
    }
    return (
        <div className="max-w-4xl mx-auto dark:text-white">
            <h3 className="text-center text-3xl font-bold">Remaining Task</h3>
            <div className="mt-10">
                <Table hoverable={true}>
                    <Table.Head className="text-base text-[#05A3B7]">
                        <Table.HeadCell>Serial</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {tasks.map((task, i) => (
                            <Table.Row
                                key={task._id}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {i + 1}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {task.title}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-2 ">
                                    <MdDeleteForever
                                        onClick={() => handleDelete(task._id)}
                                        className="text-red-500 cursor-pointer"
                                        size={25}
                                    />
                                    <AiFillEdit
                                        onClick={() => handleEdit(task._id)}
                                        className="text-yellow-400 cursor-pointer"
                                        size={25}
                                    />
                                    <MdFileDownloadDone
                                        onClick={() => handleComplete(task._id)}
                                        className="text-green-500 cursor-pointer"
                                        size={25}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            {/* update modal */}
            {updateModal && (
                <React.Fragment>
                    <Modal
                        show={updateModal}
                        size="md"
                        popup={true}
                        onClose={() => setUpdateModal(false)}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                <form
                                    onSubmit={handleUpdate}
                                    className="space-y-6"
                                >
                                    <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                                        Edit Task
                                    </h3>
                                    {/* title */}
                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="title"
                                                value="Task Title"
                                            />
                                        </div>
                                        <TextInput
                                            type="text"
                                            id="title"
                                            name="title"
                                            defaultValue={selectedTask?.title}
                                            required={true}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </React.Fragment>
            )}
        </div>
    );
};

export default MyTask;
