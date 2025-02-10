import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";

const CRUD = () => {
    const empdata = [
        { id: "10001", name: "imal", age: "25", isActive: "yes" },
        { id: "10002", name: "nimal", age: "27", isActive: "yes" },
        { id: "10003", name: "ranil", age: "27", isActive: "yes" }
    ];

//model popup
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


//use state for add

const [name,setName]=useState('');
const [age,setAge]=useState('');
const [isActive,setIsActive]=useState('');


//use state for Edit

const [editId,setEditId]=useState('');
const [editName,setEditName]=useState('');
const [EditAge,setEditAge]=useState('');
const [EditIsActive,setEditIsActive]=useState('');



 const [data, setData] = useState([]); // State for storing data

//console.log(setData);

    //console.log (data);
    useEffect(() => {
        getData();
    }, []); // Runs once when component mounts

//get data from API 

const getData=()=>
{
    axios.get('https://localhost:7129/api/Employee')

    

    .then((result)=>{
        setData(result.data)
       
    })
    .catch((error)=>{
        console.log(error);
    })

}




    const handelEdit =(id)=>{
        //alert (id);
        handleShow ();
    }


    const handelUpdate=(id)=>{

    }

    const handelDelete =(id)=>{
        if (window.confirm("Are you sure to delete employee")== true){

            alert (id);

        }
     
    }
    return (
        <>


<Form>
      <Form.Group >
        <Form.Label>Enter Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" 
        value={name}  onChange={(e)=> setName(e.target.value)}/>
   

        <Form.Label>Enter Age</Form.Label>
        <Form.Control type="text" placeholder="Enter Age" 
        
        value ={age}
        onChange={(e)=> setAge(e.target.value)}
        />

        <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="is Active"  className="custom-checkbox"  
        checked={isActive===1 ? true :false}
        onChange={(e)=> setIsActive(e)} value={isActive}
        
        />
      </Form.Group>


      </Form.Group>


      <Button variant="primary" type="submit">
        Submit
      </Button>


 </Form>



<br/>


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>isActive</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.isActive}</td> {/* Fixed casing */}
                             

                                <td  colSpan={2}>
                                <button className="btn btn-primary" onClick={()=>handelEdit(item.id)}>Edit</button> |
                                <button className="btn btn-danger" onClick={()=>handelDelete(item.id)}>delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>
                    )}
                </tbody>
            </Table>





            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employeee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            
<Form>
    

<Form.Group>
        <Form.Label>Enter Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" 
        value={editName}  onChange={(e)=> setEditName(e.target.value)}/>
   

        <Form.Label>Enter Age</Form.Label>
        <Form.Control type="text" placeholder="Enter Age" 
        
        value ={EditAge}
        onChange={(e)=> setEditAge(e.target.value)}
        />

        <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="is Active"  className="custom-checkbox"  
        checked={EditIsActive==1 ? true :false}
        onChange={(e)=> setEditIsActive(e)} value={EditIsActive}
        
        />
      </Form.Group>

      </Form.Group>



 </Form>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handelUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
};

export default CRUD;
