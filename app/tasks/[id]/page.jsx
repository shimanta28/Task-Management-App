"use client";
import { useEffect, useState } from "react";
// import "./createtask.css";
import { db } from "@/firebase";
import { child, get, ref, remove, set } from "firebase/database";
import Link from "next/link";
import swal from "sweetalert";

export default function ViewUpdateDeletePage({ params }) {
  const [usersList, setUsersList] = useState([]);
  //   const [taskDetails, setTaskDetails] = useState([]);

  const [formData, setFormData] = useState({
    title: null,
    description: null,
    status: null,
    assigned_user: null,
    deadline: null,
  });

  const getUserList = () => {
    get(child(ref(db), `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          setUsersList(Object.values(data));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTaskDetails = () => {
    get(child(ref(db), `tasks/${params.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //   console.log(snapshot.val());
          const data = snapshot.val();

          setFormData(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUserList();
    getTaskDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    set(ref(db, `tasks/${params.id}`), formData);
    swal("Successfully updated!", "", "success");
  };

  const handleDelete = (e) => {
    //  remove(ref(db, `tasks/${params.id}`));
  };

  return (
    <div>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputTitle1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputTitle1"
            name="title"
            onChange={handleChange}
            value={formData.title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputDescription1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleInputDescription1"
            rows={5}
            name="description"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>

        <div className="d-flex mb-3">
          <div className="col-3 me-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="status"
              onChange={handleChange}
              value={formData.status}
            >
              <option>Select Status</option>
              <option value="todo">Todo</option>
              <option value="in_progress">Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="col-3 me-3">
            <label htmlFor="assigned_user" className="form-label">
              Assigned user
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="assigned_user"
              onChange={handleChange}
              value={formData.assigned_user}
            >
              <option>Select user</option>
              {usersList.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {`${item.username}: <${item.email}>`}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-2 me-3">
            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              className="form-control"
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              value={formData.deadline}
            />
          </div>
        </div>

        <div className="d-flex">
          <button type="submit" className="btn btn-success me-4">
            Update Task
          </button>

          <button className="btn btn-outline-danger" onClick={handleDelete}>
            Delete Task
          </button>
        </div>
      </form>

      <div className="d-flex justify-content-center mt-4">
        <Link href={"/"} className="btn btn-outline-dark">
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}
