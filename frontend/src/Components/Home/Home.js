import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import pr from './product.png'


export default function Home() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const { user } = jwt_decode(token)
  const userName = user.User
  const id =parseInt(localStorage.getItem("Id"))


  const [showD, setshowD] = useState(false)

  const handleClose1 = (e) => {
    setshowD(false)
  }
  console.log(user)
  const [state, setState] = useState({
    pname: "",
    category: "",
    price: "",
    id:id
  })
  const [list, setList] = useState([])
  console.log(state)
  const [add, setAdd] = useState(false)
  const [search, setSearch] = useState("")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleButton = () => {

    localStorage.clear()
    navigate('/')
    toast.success('🦄 Logout Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  }
  const handleChange = (e) => {
    e.preventDefault()
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const res = await axios.post("http://localhost:2020/add-product", state)
 
    console.log(res)
    toast.success('🦄 PRODUCT ADDED', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setShow(false)
    setState({pname:"",category:"",price:""})
    getProduct()
    // setState({[e.target.name]:""})
  }

  const getProduct = async () => {
    const res = await axios.get(`http://localhost:2020/get-product?id=${id}`)
    console.log(res)
    setList(res.data.product)

  }
  // const handleProduct=(e)=>
  // {
  //     setAdd(true)
  // }
  const handleProduct = () => setAdd(true);
  useEffect(() => {
    getProduct()
  }, [])

  const getSearch = async () => {
    const res = await axios.get(`http://localhost:2020/search-product?pname=${search}&userId=${id}`)
    console.log(res.data.product)
    setList(res.data.product)
  }
  useEffect(() => {
    getSearch()
  }, [search])

  const [detail, setDetail] = useState([])
  const handleDetail = (item) => {
    setshowD(true)
    setDetail(item)
  }

  const [showU, setShowU] = useState(false)
  const [update, setUpdate] = useState([])
  const handleUpdate = (item) => {
    console.log("item=", item)
    setShowU(true)
    setUpdate(item)
    console.log("update=", { update })
  }
  const handleClose2 = (e) => {
    setShowU(false)
  }

  const handleDelete = async (id) => {
    const res = await axios.post(`http://localhost:2020/delete-product?id=${id}`)
    getProduct()
  }
  const [state1, setState1] = useState({
    d_id: "",
    dname: "",
    dprice: "",
    dcategory: "",

  })
  useEffect(() => {
    const changeState = {
      d_id: update.Id,
      dname: update.Name,
      dprice: update.Price,
      dcategory: update.Category
    }
    setState1(changeState)
  }, [update])

  const handleUChange = (e) => {
    setState1({ ...state1, [e.target.name]: e.target.value })
  }
  const handleUSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post("http://localhost:2020/update-product", state1)

    getProduct()
  }
  return (
    <div>


      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

              <Button variant="outline-success btn-lg" onClick={handleShow} >ADD PRODUCT</Button>

            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search" id="search" value={search} name="search" onChange={(event) => {
                  setSearch(event.target.value)

                }}
              />

              <Navbar.Text className="mx-5">
                Signed in as: {userName}
              </Navbar.Text>
              <Button variant="outline-danger btn-lg" onClick={handleButton}>LOGOUT</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>



      <br /><br />
      {/* Modal */}





      {list.length > 0 && list.map((item) => {
        return (
          <Card style={{ width: '20rem' }} id="card">
            <Card.Img variant="top" src={pr} />
            <Card.Body>
              <Card.Title>PRODUCT NAME: {item.Name}</Card.Title>
              <Card.Text>
                PRODUCT CATEGORY:{item.Category}<br />
                PRODUCT PRICE:{item.Price}<br />
              </Card.Text>
              <Button variant="primary m-1" onClick={() => handleDetail(item)}>DETAILS</Button>
              <Button variant="primary m-1" onClick={() => handleUpdate(item)}>UPDATE</Button>

              <Button variant="primary" onClick={() => handleDelete(item.Id)} >DELETE</Button>

            </Card.Body>
          </Card>
        )
      })}




      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD PRODUCTS</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>



            <hr />
            <br />

            <div class="form-group">
              <div class="input-group">

                <input type="text" class="form-control" name="pname" value={state.pname} onChange={handleChange} placeholder="ENTER PRODUCT NAME" required="required" />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <select  name="category" value={state.category} onChange={handleChange} placeholder="ENTER PRODUCT CATEGORY " required="required">
                  <option>PRODUCT CATEGORY</option>
                   <option value="Electrical">Electrical</option>
                   <option value="Eatable">Eatable</option>
                   <option value="Textile">Textile</option>
                   <option value="Furniture">Furniture</option>
                </select>
                {/* <input type="text" class="form-control" name="category" value={state.category} onChange={handleChange} placeholder="ENTER PRODUCT CATEGORY " required="required" /> */}
              </div>
            </div>

            <div class="form-group">
              <div class="input-group">

                <input type="number" class="form-control" name="price" value={state.price} onChange={handleChange} placeholder="ENTER PRODUCT PRICE " required="required" />
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-lg">ADD PRODUCT </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>




      <Modal show={showU} onHide={handleClose2}>
        <form onSubmit={handleUSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>PRODUCT NAME: <input type="text" value={state1.dname} name="dname" onChange={handleUChange} /></Modal.Title>
          </Modal.Header>
          <Modal.Body>PRODUCT CATEGORY: <input type="text" value={state1.dcategory} name="dcategory" onChange={handleUChange} /><br /><br />
            PRODUCT PRICE: <input type="text" value={state1.dprice} name="dprice" onChange={handleUChange} /></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose2}>
              UPDATE
            </Button>
          </Modal.Footer>
        </form>
      </Modal>


      <Modal show={showD} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>PRODUCT NAME:{detail.Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>PRODUCT CATEGORY:{detail.Category}<br /><br />
          PRODUCT PRICE:{detail.Price}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose1}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}


