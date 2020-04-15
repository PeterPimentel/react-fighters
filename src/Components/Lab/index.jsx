import React, {useState} from 'react'

import Modal from '../modal'

import {Button} from '../../styles/common'

const style = { margin: "50px", display: "flex", justifyContent: "space-evenly" }

export default function Lab() {
    const [show, setShow] = useState(true)

    return (
        <div style={style}>
            <button onClick={()=>setShow(true)}>Show</button>
            <Modal
                message="Here comes a new challenger"
                show={show}
                handleClose={()=>setShow(!show)}
                action={
                    <>
                        <Button>Accept</Button>
                        <Button onClick={()=>setShow(!show)}>Decline</Button>
                    </>
                }
            />
        </div>
    )
}
