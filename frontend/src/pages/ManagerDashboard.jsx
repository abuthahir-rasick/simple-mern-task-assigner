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
      setName(""); setEmail(""); setPassword("");
      setShowRegModal(false);
      setModal({ show: true, title: "Success", message: "New employee added to the team" });
      dispatch(getEmployees());
    } catch (err) {}
  };

  const handleUpdate = (employee) => setSelectedEmployee(employee);
  const handleDelete = (id) => {
    setConfirmModal({
      show: true,
      title: "Delete Employee",
      message: "This action will remove the employee and their task associations.",
      onConfirm: () => dispatch(deleteEmployee(id)).then(() => dispatch(mfetchTaskList())),
    });
  };

  const handleSave = async (data) => {
    await dispatch(updateEmployee({ id: selectedEmployee._id, data })).then(() => {
      setSelectedEmployee(null);
      dispatch(getEmployees());
      dispatch(mfetchTaskList());
    });
  };

  const handleUpdateTask = async (e, task) => {
    e.preventDefault();
    await dispatch(updateTask({ id: task._id, title, desc })).unwrap();
    setTitle(""); setDesc(""); setEditTask(null);
    setModal({ show: true, title: "Success", message: "Task details updated" });
    dispatch(mfetchTaskList());
  };

  const handleSubmit = async (e, employee) => {
    e.preventDefault();
    await dispatch(addTask({ title, desc, email: employee.email })).unwrap();
    setTitle(""); setDesc(""); setTaskEmployee(null);
    setModal({ show: true, title: "Success", message: "Task assigned successfully" });
    dispatch(mfetchTaskList());
  };

  return (
    <div className="min-h-[calc(100vh-90px)] bg-slate-50/50 p-4 sm:p-8 md:p-10">
      
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Manager Dashboard
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-[0.2em] font-bold mt-2">
              Team Oversight & Task Management
            </p>
          </div>
          <button
            onClick={() => setShowRegModal(true)}
            className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white text-xs sm:text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
          >
            + Register Employee
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
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

        <div className="mt-16 mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">Task Overview</h3>
          <div className="h-1 w-12 bg-indigo-600 rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {list.length > 0 ? (
            list.map((t) => (
              <div
                key={t._id}
                className={`group relative bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-8 shadow-xl shadow-slate-200/50 hover:shadow-indigo-100 transition-all duration-300 flex flex-col hover:-translate-y-1 overflow-hidden
                ${t.status === "Reviewed" ? "border-l-8 border-l-emerald-500" : "border-l-8 border-l-indigo-500"}`}
              >
                <div className="mb-6">
                  {/* Dynamic Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      t.status === "Reviewed" ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${t.status === "Reviewed" ? "bg-emerald-500 animate-pulse" : "bg-indigo-500"}`}></span>
                      {t.status === "Reviewed" ? "Review Required" : "In Progress"}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium line-clamp-3 leading-relaxed mb-4">
                    {t.desc}
                  </p>
                  
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {t.employeeId?.name?.charAt(0) || "?"}
                    </div>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                       Assignee: <span className="text-slate-700">{t.employeeId?.name || "Unassigned"}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <button
                    onClick={() => { setEditTask(t); setTitle(t.title); setDesc(t.desc); }}
                    className="px-3 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition active:scale-95 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    disabled={t.status !== "Reviewed"}
                    onClick={async () => {
                      await dispatch(managerDecision({ id: t._id, action: "ok" })).unwrap();
                      setModal({ show: true, title: "Success", message: "Task moved to completed" });
                      dispatch(mfetchTaskList());
                    }}
                    className={`px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition active:scale-95
                    ${t.status !== "Reviewed" ? "bg-slate-50 text-slate-300 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer shadow-lg shadow-emerald-100"}`}
                  >
                    Approve
                  </button>
                  <button
                    disabled={t.status !== "Reviewed"}
                    onClick={() => dispatch(managerDecision({ id: t._id, action: "notOk" }))}
                    className={`px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition active:scale-95
                    ${t.status !== "Reviewed" ? "bg-slate-50 text-slate-300 cursor-not-allowed" : "bg-amber-500 text-white hover:bg-amber-600 cursor-pointer shadow-lg shadow-amber-100"}`}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      setConfirmModal({
                        show: true, title: "Delete Task", message: "Permanently delete this task?",
                        onConfirm: () => dispatch(managerDecision({ id: t._id, action: "ok" })),
                      });
                    }}
                    className="px-3 py-2.5 bg-rose-50 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition active:scale-95 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No tasks active in the system</p>
            </div>
          )}
        </div>
      </div>

      {showRegModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setShowRegModal(false)}></div>
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-2 overflow-hidden animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowRegModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 z-10 transition-colors">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
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

      {taskEmployee && !editTask && (
        <TaskForm employee={taskEmployee} title={title} setTitle={setTitle} desc={desc} setDesc={setDesc}
          handleSubmit={handleSubmit} onClose={() => { setTaskEmployee(null); setTitle(""); setDesc(""); }} mode="create" />
      )}
      {editTask && (
        <TaskForm employee={editTask.employeeId} title={title} setTitle={setTitle} desc={desc} setDesc={setDesc}
          handleSubmit={(e) => handleUpdateTask(e, editTask)} onClose={() => { setEditTask(null); setTitle(""); setDesc(""); }} mode="edit" />
      )}

      <Modal show={modal.show} onClose={() => setModal({ ...modal, show: false })} title={modal.title} message={modal.message} />
      <ConfirmModal show={confirmModal.show} onClose={() => setConfirmModal({ ...confirmModal, show: false })}
        title={confirmModal.title} message={confirmModal.message} onConfirm={confirmModal.onConfirm} />
    </div>
  );
};

export default ManagerDashboard;