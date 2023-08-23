import { API } from "../../backend";




//get a product
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//get all categories
export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//product call

//creating a product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};


//get all the products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };

//delete a product
export const deleteProduct = (productId,userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };


//get a product
export const getProduct = prodID =>{
    return fetch(`${API}/product/${prodID}`,{
        method:"GET"
    })
    .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));

}

//update a product
export const updateProduct = (productId,userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };