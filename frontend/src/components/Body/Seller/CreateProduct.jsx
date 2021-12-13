import React, { useState } from 'react';
import Input from '../input';
import { Link } from 'react-router-dom';
import "./seller.css";
import { useHistory } from 'react-router';

function CreateProduct() {
    let history = useHistory();
    let sample = {
        name: "",
        price: 0,
        desc: "",
        category: "",
        stock: 1,
        images: []
    }

    const [prodData, setProdData] = useState(sample);

    function prodInput(event) {
        let { name, value } = event.target;

        setProdData(prev => {
            return { ...prev, [name]: value };
        });
    };

    function addFiles(e) {
        const files = e.target.files;
        setProdData(prev => {
            return { ...prev, images: files }
        })
    };

    async function addProd(e) {
        e.preventDefault();

        const data = new FormData();
        data.append("name", prodData.name);
        data.append("price", prodData.price);
        data.append("desc", prodData.desc);
        data.append("category", prodData.category);
        data.append("stock", prodData.stock);
        for (let i = 0; i < prodData.images.length; i++) {
            data.append("images", prodData.images[i]);
        }

        // fetch("/create/product", {
        //     method: "POST",
        //     body: data
        // }).then(history.push("/seller"));

        fetch("/create/product", {
            method: "POST",
            body: data
        }).then((data) => {
            if (data.status !== 200) {
                alert("your product has not been created");
            } else {
                history.push("/seller");
            }
        })




        // setProdData(sample)
    };

    function login(e) {
        e.preventDefault();
        history.push("/login")
    }

    return <form onSubmit={addProd}>

        <div className="custom-container m-auto">

            <div className="container-fluid">

                <Input type="text" label="Name" placeholder="Enter product Name" name="name" onChange={prodInput} value={prodData.name} required />
                <Input type="number" label="Price" placeholder="Enter product Price" name="price" onChange={prodInput} value={prodData.price} required />
                <Input type="text" label="Desc" placeholder="Enter product Description" name="desc" onChange={prodInput} value={prodData.desc} />

                {/* <Input type="text" label="Category" placeholder="Enter product Type" name="category" onChange={prodInput} value={prodData.category} /> */}
                <div className="mb-3 row">
                    <label htmlFor="selectCategory" className="col-sm-2 col-form-label"> Category</label>
                    <div className="col-sm-10">
                        <select className="form-select" name="category" id="selectCategory"
                            onChange={prodInput} value={prodData.category}
                            aria-label="Default select example"
                        >
                            <option defaultValue="">select Category</option>
                            <option value="TopWear">Top wear -- Shirts/Tshirts/Jackets</option>
                            <option value="BottomWear">Bottom wear -- Jeans/Trousers</option>
                            <option value="FootWear">Foot wear -- Shoes/Sandles</option>
                            <option value="Electronics">Electronics -- Mobile/Laptop/Tablet</option>
                        </select>
                    </div>
                </div>


                <Input type="number" label="Stock" placeholder="Enter product Stock" name="stock" onChange={prodInput} value={prodData.stock} required />
                <Input type="file" label="Images" accept="image/png,image/jpg, image/jpeg" name="images" onChange={addFiles} required multiple />

                <Link to="/login" > <button className="btn btn-light m-2" onClick={login} > Login </button> </Link>
                <button type="submit" className="btn btn-dark m-2" > Add </button>

            </div>
        </div>
    </form>
};

export default CreateProduct;