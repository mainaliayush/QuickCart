'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {

  const { getToken } = useAppContext();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('name', name)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('offerPrice', offerPrice)

    for (let i = 0; i < files.length; i++){
      formData.append('images', files[i])
    }

    try {

      const token = await getToken()
      const { data } = await axios.post('/api/product/add', formData, {headers: {Authorization: `Bearer ${token}`}})

      if (data.success){
        toast.success(data.message)
        setFiles([])
        setName('')
        setDescription('')
        setCategory('')
        setPrice('')
        setOfferPrice('')
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50 flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-6 max-w-xl mt-1 mb-16">
        {/* <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Product</h2> */}
  
        {/* Upload Images */}
        <div>
          <p className="text-md font-medium text-gray-700">Product Images</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <Image
                  key={index}
                  className="w-24 h-24 object-cover rounded-md border border-gray-300 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>
  
        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className="text-md font-medium text-gray-700" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Enter product name"
            className="outline-none py-2 px-3 rounded-md border border-gray-300 text-sm"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
  
        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-md font-medium text-gray-700" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none py-2 px-3 rounded-md border border-gray-300 resize-none text-sm"
            placeholder="Describe the product"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
  
        {/* Category, Price, Offer */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-col gap-1 w-44">
            <label className="text-md font-medium text-gray-700" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none py-2 px-3 rounded-md border border-gray-300 text-sm"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
            >
              <option value="RFID Cards">RFID Cards</option>
              <option value="Key Tags & Combo Cards">Key Tags & Combo Cards</option>
              <option value="Gift & Loyalty Cards">Gift & Loyalty Cards</option>
              <option value="Wristbands & Wearables">Wristbands & Wearables</option>
              <option value="Asset & Inventory Tracking">Asset & Inventory Tracking</option>
              <option value="Healthcare & Patient ID">Healthcare & Patient ID</option>
              <option value="Library & Student IDs">Library & Student IDs</option>
              <option value="Custom Encoded Solutions">Custom Encoded Solutions</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-sm font-medium text-gray-700" htmlFor="product-price">
              Price ($)
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded-md border border-gray-300 text-sm"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-md font-medium text-gray-700" htmlFor="offer-price">
              Offer ($)
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded-md border border-gray-300 text-sm"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>
  
        {/* Submit */}
        <div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white text-md font-medium rounded-md shadow hover:bg-blue-800 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
  
};

export default AddProduct;