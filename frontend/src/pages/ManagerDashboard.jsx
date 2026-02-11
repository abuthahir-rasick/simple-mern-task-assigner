import React, { useEffect, useState } from 'react'
import { addTask, managerDecision, mfetchTaskList, updateTask } from '../features/tasks/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeList from '../components/EmployeeList';
import TaskForm from '../components/TaskForm';
import { deleteEmployee, eRegister, getEmployees, updateEmployee } from '../features/auth/authSlice';
import EmployeeRegister from '../components/EmployeeRegister';
import Modal from '../components/Modal';
import ConfirmModal from '../components/confirmModal';

const ManagerDashboard = () => {
   const [modal, setModal] = useState({ show: false, title: '', message: '' });
   const [confirmModal, setConfirmModal] = useState({show: false,title: '',message: '',onConfirm: null});
    const dispatch=useDispatch();
    const {list}=useSelector(state=>state.tasks);
    const {list:employeeList,loading}=useSelector(state=>state.auth);
    const [selectedEmployee,setSelectedEmployee]=useState(null);
    const [taskEmployee,setTaskEmployee]=useState(null);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [title,setTitle]=useState('');
    const [desc,setDesc]=useState('');
    const [editTask, setEditTask] = useState(null);
    useEffect(()=>{
            dispatch(getEmployees());
            dispatch(mfetchTaskList());
        },[dispatch])
    const handleRegister=async(e)=>{
       e.preventDefault();
       await dispatch(eRegister({email,password,name})).unwrap();
     setName(''); setEmail('');setPassword('')
      setModal({ show: true, title: 'Success', message: 'Employee registered successfully' });
      dispatch(getEmployees());           
    }
    const handleUpdate=(employee)=>{
            setSelectedEmployee(employee)
        }
        const handleDelete=(id)=>{
            setConfirmModal({show: true,title: 'Delete Employee',message: 'Are you sure you want to delete this employee?',
              onConfirm: () => dispatch(deleteEmployee(id)).then(() => dispatch(mfetchTaskList()))});
        }
    const handleSave=async(data)=>{
           await dispatch(updateEmployee({
                id:selectedEmployee._id,
                data
            })).then(()=>{
                setSelectedEmployee(null);
                dispatch(getEmployees());
                dispatch(mfetchTaskList());
            })
  }
  const handleUpdateTask = async (e, task) => {
  e.preventDefault();

  await dispatch(updateTask({
    id: task._id,
    title,
    desc
  })).unwrap();
setTitle('');setDesc('')
  setModal({ show: true, title: 'Success', message: 'Task updated successfully' });
  setEditTask(null);
  dispatch(mfetchTaskList());
};
const handleSubmit=async(e,employee)=>{
  e.preventDefault();
  await dispatch(addTask({
    title,
      desc,
      email: employee.email
  })).unwrap();
  setTitle('');setDesc('')
      setModal({ show: true, title: 'Success', message: 'Task added successfully' });
      setTaskEmployee(null)
      dispatch(mfetchTaskList());
      
}
  return (
    <div className=" min-h-screen bg-gray-100 p-4 md:p-8">
        <EmployeeRegister name={name} setName={setName} email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleRegister={handleRegister} />
        <EmployeeList list={employeeList} handleUpdate={handleUpdate} handleDelete={handleDelete} 
        selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} taskEmployee={taskEmployee} setTaskEmployee={setTaskEmployee} 
        loading={loading} handleSave={handleSave}/>
       {taskEmployee && !editTask && (
        <TaskForm employee={taskEmployee} title={title} setTitle={setTitle} desc={desc} setDesc={setDesc} handleSubmit={handleSubmit} 
       onClose={()=>{setTaskEmployee(null);setTitle('');setDesc('')}} mode="create" />)} 
       {editTask &&(
        <TaskForm employee={editTask.employeeId} title={title} setTitle={setTitle} desc={desc} setDesc={setDesc}
        handleSubmit={(e) => handleUpdateTask(e, editTask)} 
       onClose={()=>{setEditTask(null);setTitle('');setDesc('')}} mode="edit" />
       )}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
      {list.length>0?(
        <>
        {list.map(t=>
          (<div className={`
          ${t.status === "Reviewed" ? "bg-green-50 border-green-200 " : "bg-blue-50 border-blue-200"}
          rounded-xl shadow-md p-5 hover:shadow-lg transition`} key={t._id}>
        <h3 className="text-2xl font-bold mb-2">{t.title}</h3>
        <p className=" mb-3">{t.desc}</p>
        <p className="text-sm font-medium  mb-4">Employee: {t.employeeId?.name}</p>
        <div className="flex flex-wrap gap-2">
        <button className="cursor-pointer px-3 py-1.5 bg-yellow-500 rounded-md text-sm hover:bg-yellow-600 transition" onClick={() => {setEditTask(t); setTitle(t.title); setDesc(t.desc)}}>Edit</button>
        <button disabled={t.status!=='Reviewed'}  onClick={()=>dispatch(managerDecision({id:t._id,action:'ok'}))}
          className={` px-3 py-1.5 rounded-md text-sm  transition 
                ${t.status !== 'Reviewed' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 cursor-pointer'}`}>Ok</button>
        <button disabled={t.status!=='Reviewed'}  onClick={()=>dispatch(managerDecision({id:t._id,action:'notOk'}))}
          className={` px-3 py-1.5 rounded-md text-sm  transition 
                ${t.status !== 'Reviewed' ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'}`}>Not Ok</button>
        <button onClick={()=>{
          setConfirmModal({show: true,title: 'Delete Task',message: 'Are you sure you want to delete this task?',
              onConfirm: () => dispatch(managerDecision({id:t._id,action:'ok'}))});
        }}
          className="cursor-pointer px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition shadow-sm">Delete</button>
         </div>   
        </div>
      ))}
        </>
      ):(<div className="col-span-full text-center text-gray-500 text-lg">
        No Tasks are created
      </div>)}</div>
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
    
  )
}

export default ManagerDashboard
