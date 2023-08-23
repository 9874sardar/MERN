import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Badge from 'react-bootstrap/Badge';

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAutheticated();

  const adminLeft = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white"> Admin navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRight = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Details</h4>
        <ul className="list-group">
          <li className="list-group-item">
          <Badge bg="secondary mr-2">Name :</Badge>
            {name}
          </li>
          <li className="list-group-item">
          <Badge bg="secondary mr-2">Email :</Badge>
            {email}
          </li>

          
          <li className="list-group-item">
          <Badge bg="danger">This is a retricted Admin area</Badge>
          </li>

        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welocme to Admin DashBoard"
      description="Manage all stuff here boss !!"
      className="container bg-success p-4"
    >
      <h1>AdminDashBoard</h1>
      <div className="container">
        <div className="row">
          <div className="col-3">{adminLeft()}</div>
          <div className="col-9">{adminRight()}</div>
        </div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
