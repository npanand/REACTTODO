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
                        <div key={id} className='listdatas'><ul key={id} style={{ listStyleType: 'none', display: "flex", justifyContent: "space-between" }}>
                            <li >{data.title}</li>
                            <span style={{ display: "flex", justifyContent: "flex-end", }}>
                                <button style={{ marginRight: "10px", cursor: "pointer" }} onClick={() => (
                                    updateData(data.title), modeChange("update"))
                                }><BsPencilSquare /></button>
                                <button style={{ marginRight: "5px", cursor: "pointer" }} onClick={() =>
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