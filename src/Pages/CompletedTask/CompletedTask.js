import { Table } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdRemoveDone } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";

const CompletedTask = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_API_URL}/task/${user?.email}?isComplete=true`
        )
            .then((res) => res.json())
            .then((data) => {
                setTasks(data.data);
            });
    }, [user, refresh]);

    const handleNotComplete = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/task/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ isCompleted: false }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    toast.success("Set The Task As Incomplete!");
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

    if (!tasks.length) {
        return (
            <div className="flex justify-center items-center w-full h-[80vh]">
                <p className="font-bold text-2xl">No Completed Task</p>
            </div>
        );
    }
    return (
        <div className="max-w-4xl mx-auto">
            <h3 className="text-center text-3xl font-bold">Completed Task</h3>
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
                                    <MdRemoveDone
                                        onClick={() =>
                                            handleNotComplete(task._id)
                                        }
                                        className="text-yellow-400 cursor-pointer"
                                        size={25}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default CompletedTask;
