import React, { useEffect, useState, useContext, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export default function Products() {
    const { token } = useContext(AuthContext);
    const [productData, setProductData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);

    const getProducts = useCallback(async () => {
        const url = searchTerm
            ? `http://localhost:3001/products?search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`
            : `http://localhost:3001/products?page=${currentPage}&limit=${itemsPerPage}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.status === 200) {
                setProductData(data.products);
                setTotalProducts(data.totalProducts);
            }
            else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
    }, [token, searchTerm, currentPage, itemsPerPage]);

    useEffect(() => {
        if (token) {
            const debounceTimer = setTimeout(() => {
                getProducts();
            }, 300); // 300ms debounce delay

            return () => clearTimeout(debounceTimer);
        }
    }, [token, getProducts]);

    const deleteProduct = useCallback(async (id) => {
        const response = await fetch(`http://localhost:3001/deleteproduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        await response.json();

        if (response.status === 200) {
            console.log("Product deleted");
            getProducts();
        } else {
            console.log("Error");
        }
    }, [token, getProducts]);

    return (
        <>


            <div className='container-fluid p-5'>
                <h1>Products Inventory</h1>
                <div className="d-flex justify-content-between mb-3">
                    <div className="col-lg-6 col-md-6 col-12">
                        <input
                            type="text"
                            className="form-control fs-5"
                            placeholder="Search by Product Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className='add_button'>
                        <NavLink to="/insertproduct" className='btn btn-primary fs-5'> + Add New Product</NavLink>
                    </div>
                </div>
                <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                    <table className="table table-striped table-hover mt-3 fs-5">
                        <thead>
                            <tr className="tr_color">
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Product Quantity</th>
                                <th scope="col">Product Category</th>
                                <th scope="col">Product Barcode</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                productData.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.ProductName}</td>
                                                <td>{element.ProductPrice}</td>
                                                <td>{element.ProductQuantity}</td>
                                                <td>{element.ProductCategory}</td>
                                                <td>{element.ProductBarcode}</td>

                                                <td><NavLink to={`/updateproduct/${element._id}`} className="btn btn-primary"><i className="fa-solid fa-pen-to-square"></i></NavLink></td>
                                                <td><button className="btn btn-danger" onClick={() => deleteProduct(element._id)}><i class="fa-solid fa-trash"></i></button></td>

                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center">
                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(totalProducts / itemsPerPage) }, (_, i) => i + 1).map(page => (
                                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

        </>
    )
}
