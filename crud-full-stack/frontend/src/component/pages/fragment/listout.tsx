import React from 'react'

function listout({ todolist }:any) {
    return (
        <div >
            {
                todolist?.map((data: any, id: any) => {
                    return (
                    <div key={id} className='listdatas'><ul key={id} style={{ listStyleType: 'none' }}>
                        <li >{data.title}</li>
                    </ul>
                    </div>)
                })}
        </div>
    )
}

export default listout;