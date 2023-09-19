import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import { deleteTodoData } from '../../service/todoData';
const listout = ({ todolist, getCall, updateData, modeChange }: any) => {
    const deletetodo = async (arg: any) => {
        deleteTodoData(arg).then((res: any) => {
            if (res && res.status === 200) {
                toast.success('successfully data deleted', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 4000, // Close after 3 seconds
                });
                getCall();
            }
        })
            .catch((err: any) => {
                console.log(err);
            })

    }

    return (
        <div >
            {
                todolist?.map((data: any, id: any) => {
                    return (
                        <div key={id} className='m-3 border-solid border-red-700  border-2 p-1'><ul key={id} className="flex justify-between list-none"  >
                            <li >{data.title}</li>
                            <span className='flex justify-end'>
                                <button className='mr-2 cursor-pointer' onClick={() => (
                                    updateData(data.title), modeChange("update"))
                                }><BsPencilSquare /></button>
                                <button  className='mr-2 cursor-pointer' onClick={() =>
                                    deletetodo(data.title)
                                }><MdDelete /></button>
                            </span>
                        </ul>
                        </div>)
                })}
        </div>
    )
}

export default listout;