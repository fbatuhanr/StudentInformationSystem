import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { serverAddress } from '../settings'

import HumanImg4 from "../assets/human-4.png"
import { FaEraser, FaPlus } from 'react-icons/fa'
import { FiRefreshCw } from 'react-icons/fi'
import Swal from 'sweetalert2'

const Canteen = () => {

  /* FETCHING EXIST CLASSES FROM DB */
  const [products, setProducts] = useState([])
  const productsRefs = useRef([]);
  useEffect(() => {

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

  /* HANDLING NEW CLASS ADD TO DB */
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")

  const handleAddNewButton = () => {
    if (productName.trim().length === 0 || productPrice.trim().length === 0) return

    axios.post(`${serverAddress}/canteen`, {
      name: productName,
      price: productPrice
    })
      .then((response) => {
        console.log(response)
        window.location.reload();
      })
      .catch(error => console.error(error))
  }

  /* HANDLING UPDATE CLASS */
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
      name: productName,
      price: productPrice
    })
      .then((response) => {
        console.log(response)
        window.location.reload();
      })
      .catch(error => console.error(error));
  }

  /* HANDLING REMOVE CLASS */
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

        if (response.data.error){
          Swal.fire({title: "Error", text: response.data.error, icon: "error"})
          return
        }
        window.location.reload();
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="relative">
      <div className="px-12 py-8 font-outfit">
        <h2 className="text-2xl font-bold mt-2">Canteen</h2>
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
                          defaultValue={product.Name}
                          ref={event => {
                            productsRefs.current[index] = productsRefs.current[index] || [];
                            productsRefs.current[index][0] = event;
                          }}
                        />
                        <input type="text" placeholder="type here..." className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl"
                          defaultValue={product.Price}
                          ref={event => {
                            productsRefs.current[index] = productsRefs.current[index] || [];
                            productsRefs.current[index][1] = event;
                          }}
                        />
                      </div>
                      <button type="button" onClick={() => handleRemoveButton(product.ID)}>
                        <FaEraser className="text-2xl" />
                      </button>
                      <button type="button" onClick={() => handleUpdateButton(product.ID, index)}>
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
            <div className="flex justify-between text-sm font-medium px-3">
              <h4>Name</h4>
              <h4>Price</h4>
              <h4>Action</h4>
            </div>
            <div className="flex items-center gap-x-3">
              <div className="flex gap-x-1">
                <input type="text" placeholder="type here..." value={productName} onChange={(e) => setProductName(e.target.value)}
                  className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
                <input type="text" placeholder="type here..." value={productPrice} onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full bg-[#0D0D0D] text-[#A1A1A1] px-4 py-3 rounded-2xl" />
              </div>
              <button type="button" onClick={handleAddNewButton}>
                <FaPlus className="text-3xl" />
              </button>
            </div>
          </div>

        </div>
      </div>
      <div className="absolute top-[35%] -right-16">
        <img src={HumanImg4} className="w-42" />
      </div>
    </div>
  )
}

export default Canteen