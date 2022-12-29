import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const task = { title: title, isCompleted: false, email: user?.email };

        fetch(`${process.env.REACT_APP_API_URL}/task`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(task),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    toast.success("Category Added Successfully");
                    navigate("/myTask");
                }
            });
    };
    return (
        <div className="max-w-lg mx-auto mt-10  md:mt-14 bg-gray-100 dark:bg-gray-700 dark:text-white px-12 py-14 rounded-xl divide-y-2">
            <h3 className="text-3xl font-bold mb-5 text-center">Add A Task</h3>
            <form onSubmit={handleSubmit} className="flex flex-col">
                {/* Title */}
                <div className="mt-4">
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Task Title" />
                    </div>
                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Learn MongoDB Crud Operation...."
                        required={true}
                    />
                </div>

                <Button className="mt-6" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddTask;
