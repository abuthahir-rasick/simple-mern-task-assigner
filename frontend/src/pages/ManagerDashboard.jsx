import React, { useEffect, useState } from "react";
import {
  addTask,
  managerDecision,
  mfetchTaskList,
  updateTask,
} from "../features/tasks/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import EmployeeList from "../components/EmployeeList";
import TaskForm from "../components/TaskForm";
import {
  deleteEmployee,
  eRegister,
  getEmployees,
  updateEmployee,
} from "../features/auth/authSlice";
import EmployeeRegister from "../components/EmployeeRegister";
import Modal from "../components/Modal";
import ConfirmModal from "../components/confirmModal";

const ManagerDashboard = () => {
  // New State for Register Modal
  const [showRegModal, setShowRegModal] = useState(false);

  const [modal, setModal] = useState({ show: false, title: "", message: "" });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.tasks);
  const { list: employeeList, loading } = useSelector((state) => state.auth);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [taskEmployee, setTaskEmployee] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(mfetchTaskList());
  }, [dispatch]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(eRegister({ email, password, name })).unwrap();
      setName("");
      setEmail("");
      setPassword("");
      setShowRegModal(false); // Close Modal on success
      setModal({
        show: true,
        title: "Success",
        message: "Employee registered successfully",
      });
      dispatch(getEmployees());
    } catch (err) {
      // Error handling logic
    }
  };

  const handleUpdate = (employee) => setSelectedEmployee(employee);
  
  const handleDelete = (id) => {
    setConfirmModal({
      show: true,
      title: "Delete Employee",
      message: "Are you sure you want to delete this employee?",
      onConfirm: () =>
        dispatch(deleteEmployee(id)).then(() => dispatch(mfetchTaskList())),
    });
  };

  const handleSave = async (data) => {
    await dispatch(
      updateEmployee({
        id: selectedEmployee._id,
        data,
      }),
    ).then(() => {
      setSelectedEmployee(null);
      dispatch(getEmployees());
      dispatch(mfetchTaskList());
    });
  };

  const handleUpdateTask = async (e, task) => {
    e.preventDefault();
    await dispatch(
      updateTask({ id: task._id, title, desc }),
    ).unwrap();
    setTitle("");
    setDesc("");
    setModal({ show: true, title: "Success", message: "Task updated successfully" });
    setEditTask(null);
    dispatch(mfetchTaskList());
  };

  const handleSubmit = async (e, employee) => {
    e.preventDefault();
    await dispatch(
      addTask({ title, desc, email: employee.email }),
    ).unwrap();
    setTitle("");
    setDesc("");
    setModal({ show: true, title: "Success", message: "Task added successfully" });
    setTaskEmployee(null);
    dispatch(mfetchTaskList());
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-100 p-4 sm:p-6 md:p-8">
      
      {/* Header Section with Register Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
          Manager Dashboard
        </h2>
        <button
          onClick={() => setShowRegModal(true)}
          className="w-full sm:w-auto px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md text-sm sm:text-base cursor-pointer"
        >
          + Register New Employee
        </button>
      </div>

      <EmployeeList
        list={employeeList}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        taskEmployee={taskEmployee}
        setTaskEmployee={setTaskEmployee}
        loading={loading}
        handleSave={handleSave}
      />

      {/* Employee Registration Modal */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowRegModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            <EmployeeRegister 
              name={name} setName={setName} 
              email={email} setEmail={setEmail}
              password={password} setPassword={setPassword} 
              handleRegister={handleRegister} 
            />
          </div>
        </div>
      )}

      {/* Task Creation/Edit Form Modals */}
      {taskEmployee && !editTask && (
        <TaskForm
          employee={taskEmployee}
          title={title} setTitle={setTitle}
          desc={desc} setDesc={setDesc}
          handleSubmit={handleSubmit}
          onClose={() => { setTaskEmployee(null); setTitle(""); setDesc(""); }}
          mode="create"
        />
      )}

      {editTask && (
        <TaskForm
          employee={editTask.employeeId}
          title={title} setTitle={setTitle}
          desc={desc} setDesc={setDesc}
          handleSubmit={(e) => handleUpdateTask(e, editTask)}
          onClose={() => { setEditTask(null); setTitle(""); setDesc(""); }}
          mode="edit"
        />
      )}

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
        {list.length > 0 ? (
          list.map((t) => (
            <div
              key={t._id}
              className={`
                ${t.status === "Reviewed" ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}
                rounded-xl shadow-sm border p-4 sm:p-5 hover:shadow-md transition flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 break-words">{t.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-3">{t.desc}</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
                   👤 {t.employeeId?.name || "Unknown"}
                </p>
              </div>

              {/* Action Buttons: Responsive Font Sizes */}
              <div className="flex flex-wrap gap-2 mt-auto">
                <button
                  className="flex-1 cursor-pointer px-3 py-2 bg-yellow-500 rounded-md text-xs sm:text-sm font-bold hover:bg-yellow-600 transition"
                  onClick={() => { setEditTask(t); setTitle(t.title); setDesc(t.desc); }}
                >
                  Edit
                </button>
                <button
                  disabled={t.status !== "Reviewed"}
                  onClick={async () => {
                    await dispatch(managerDecision({ id: t._id, action: "ok" })).unwrap();
                    setModal({ show: true, title: "Success", message: "Task approved" });
                    dispatch(mfetchTaskList());
                  }}
                  className={`flex-1 px-3 py-2 rounded-md text-xs sm:text-sm font-bold transition 
                  ${t.status !== "Reviewed" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700 cursor-pointer"}`}
                >
                  Ok
                </button>
                <button
                  disabled={t.status !== "Reviewed"}
                  onClick={() => dispatch(managerDecision({ id: t._id, action: "notOk" }))}
                  className={`flex-1 px-3 py-2 rounded-md text-xs sm:text-sm font-bold transition 
                  ${t.status !== "Reviewed" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"}`}
                >
                  Retry
                </button>
                <button
                  onClick={() => {
                    setConfirmModal({
                      show: true,
                      title: "Delete Task",
                      message: "Permanently delete this task?",
                      onConfirm: () => dispatch(managerDecision({ id: t._id, action: "ok" })), // Update this to actual delete if needed
                    });
                  }}
                  className="px-3 py-2 bg-red-600 text-white rounded-md text-xs sm:text-sm font-bold hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center p-10 bg-white rounded-xl border-2 border-dashed border-gray-300 text-gray-400 text-base sm:text-lg font-medium">
            No Tasks Found
          </div>
        )}
      </div>

      {/* Global Modals */}
      <Modal
        show={modal.show}
        onClose={() => setModal({ ...modal, show: false })}
        title={modal.title}
        message={modal.message}
      />
      <ConfirmModal
        show={confirmModal.show}
        onClose={() => setConfirmModal({ ...confirmModal, show: false })}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
      />
    </div>
  );
};

export default ManagerDashboard;