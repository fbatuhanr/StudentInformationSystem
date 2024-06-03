import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { serverAddress } from '../settings'

import HumanImg1 from "../assets/human-1.png"
import { FaEraser, FaPlus } from 'react-icons/fa'
import { FiRefreshCw } from 'react-icons/fi'
import Swal from 'sweetalert2'
import DashboardTitle from '../components/DashboardTitle.jsx'

import Select from 'react-select'

const Canteen = () => {

  const [students, setStudents] = useState([])
  const [products, setProducts] = useState([])
  const productsRefs = useRef([]);

  const [selectedStudent, setSelectedStudent] = useState()
  const [studentRestrictedProducts, setStudentRestrictedProducts] = useState()

  const [selectedBuyProduct, setSelectedBuyProduct] = useState()

  useEffect(() => {

    const fetchData = async (param) => {

      try {
        const response = await axios.get(`${serverAddress}/${param}`)
        console.log(response)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
    fetchData("student").then(data => setStudents(data))

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${serverAddress}/canteen`)
        console.log(response)
        return response.data
      }
      catch (error) {
        console.log(error)
        return []
      }
    }
    fetchProducts().then(data => setProducts(data))

  }, [])

  const fetchStudentRestrictedProducts = async (id) => {
    try {
      const response = await axios.get(`${serverAddress}/student-restricted-products/${id}`)
      console.log(response)
      return response.data.map(i => i.ProductID)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuyProduct = async () => {

    console.log(selectedStudent)
    console.log(selectedBuyProduct)

    try {
      const buyDate = new Date().toLocaleString()
      const response = await axios.post(`${serverAddress}/canteen-buy-product`, {
        studentId: selectedStudent.value,
        productId: selectedBuyProduct.value,
        buyDate
      });
      console.log(response)

      if (response.data !== true) {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Student does not have enough balance for buy this product!"
        });
      }
      else {
        Swal.fire({
          icon: "success",
          title: "Purchase Successful!",
          text: "The product was purchased by the student",
          footer: buyDate
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const handleAddNewButton = () => {
    if (productName.trim().length === 0 || productPrice.trim().length === 0) return

    axios.post(`${serverAddress}/canteen`, {
      productName,
      productPrice
    })
      .then((response) => {
        console.log(response)
        window.location.reload();
      })
      .catch(error => console.error(error))
  }
  const handleUpdateButton = async (id, refIndex) => {

    const productName = productsRefs.current[refIndex][0].value
    const productPrice = productsRefs.current[refIndex][1].value
    if (productName.trim().length === 0 || productPrice.trim().length === 0) return

    const swalResult = await Swal.fire({
      title: "Do you want to update it?",
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#29156C"
    })
    if (!swalResult.isConfirmed) return

    axios.put(`${serverAddress}/canteen/${id}`, {
      productName,
      productPrice
    })
      .then((response) => {
        console.log(response)
        window.location.reload();
      })
      .catch(error => console.error(error));
  }
  const handleRemoveButton = async (id) => {

    const swalResult = await Swal.fire({
      title: "Do you want to delete it?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#F52525"
    })
    if (!swalResult.isConfirmed) return

    axios.delete(`${serverAddress}/canteen/${id}`)
      .then((response) => {

        console.log(response)

        if (response.data.error) {
          Swal.fire({ title: "Error", text: response.data.error, icon: "error" })
          return
        }
        window.location.reload();
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <div>
        <DashboardTitle title="Buy a Product for Student" />
        <div className="flex justify-center gap-x-2 ps-32 pe-12 pt-4 pb-8">
          <div className="basis-1/3">
            <h2 className="text-xl font-bold mb-1 ps-3">Select a Student</h2>
            {
              students &&
              <Select
                name="student"
                options={students.map(i => { return { label: `${i.Name} (${i.Balance})`, value: i.ID } })}
                value={selectedStudent}
                onChange={(val) => {
                  setSelectedStudent(val)
                  fetchStudentRestrictedProducts(val.value).then(data => { setStudentRestrictedProducts(data) })
                }}
                classNames={{
                  control: () => '!bg-[#0D0D0D] !border-none !rounded-xl !py-1.5',
                  menu: () => '!bg-[#0D0D0D] !border-none',
                  option: () => '!bg-[#29156C] hover:!bg-[#3c209a] !cursor-pointer',
                  singleValue: () => '!text-white'
                }}
              />
            }
          </div>
          <div className="basis-1/3">
            <h2 className="text-xl font-bold mb-1 ps-3">Select a Product</h2>
            <Select
              name="product"
              noOptionsMessage={() => "Select a Student for Options!"}
              options={studentRestrictedProducts && products.map(i => { return { label: `${i.ProductName} (${i.ProductPrice})`, value: i.ProductID, isDisabled: studentRestrictedProducts.includes(i.ProductID) } })}
              onChange={setSelectedBuyProduct}
              value={selectedBuyProduct}
              classNames={{
                control: () => '!bg-[#0D0D0D] !border-none !rounded-xl !py-1.5',
                menu: () => '!bg-[#0D0D0D] !border-none',
                option: (state) => `${state.isDisabled ? '!bg-red-500 !cursor-not-allowed' : '!bg-[#29156C] hover:!bg-[#3c209a] !cursor-pointer'}`,
                singleValue: () => '!text-white'
              }}
            />
          </div>

          <button type="button" onClick={handleBuyProduct} disabled={!(selectedStudent && selectedBuyProduct)} className={`${selectedStudent && selectedBuyProduct ? 'bg-[#DBBA12] cursor-pointer' : 'bg-[#a6a6a6] text-[#bdbdbd] cursor-not-allowed'} basis-1/3 h-12 mt-8 rounded-xl text-xl font-semibold border border-[#0D0D0D] [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#29156c]`}>
            Buy
          </button>
        </div>
      </div >

      <div>
        <DashboardTitle title="Manage Canteen Products" />
        <div className="px-4 py-8">
          <div className="md:w-1/2 mx-auto mb-4">
            {
              products.length > 0 &&
              <>
                <h3 className="text-xl font-semibold ps-2 mb-3">Product List</h3>
                <div className="flex justify-between text-sm font-medium px-3">
                  <h4>Name</h4>
                  <h4>Price</h4>
                  <h4>Action</h4>
                </div>
                {
                  products.map((product, index) =>
                    <div key={index} className="flex items-center gap-x-3 my-1">
                      <div className="flex gap-x-1">
                        <input type="text" placeholder="type here..." className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl"
                          defaultValue={product.ProductName}
                          ref={event => {
                            productsRefs.current[index] = productsRefs.current[index] || [];
                            productsRefs.current[index][0] = event;
                          }}
                        />
                        <input type="text" placeholder="type here..." className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl"
                          defaultValue={product.ProductPrice}
                          ref={event => {
                            productsRefs.current[index] = productsRefs.current[index] || [];
                            productsRefs.current[index][1] = event;
                          }}
                        />
                      </div>
                      <button type="button" onClick={() => handleRemoveButton(product.ProductID)}>
                        <FaEraser className="text-2xl" />
                      </button>
                      <button type="button" onClick={() => handleUpdateButton(product.ProductID, index)}>
                        <FiRefreshCw className="text-2xl" />
                      </button>
                    </div>
                  )
                }
              </>
            }
          </div>

          <div className="md:w-3/5 mx-auto my-8">
            <h3 className="text-xl font-semibold ps-2 mb-3">Add New Product</h3>
            <div className="flex justify-between text-sm font-medium px-3 mb-1">
              <h4>Name</h4>
              <h4>Price</h4>
              <h4>Action</h4>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="text" placeholder="type here..." value={productName} onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
              <input type="text" placeholder="type here..." value={productPrice} onChange={(e) => setProductPrice(e.target.value)}
                className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
              <button type="button" className="min-w-12" onClick={handleAddNewButton}>
                <FaPlus className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-32 -left-16">
        <img src={HumanImg1} className="w-48" />
      </div>
    </>
  )
}

export default Canteen