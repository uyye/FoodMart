import { useEffect } from "react";
import "../app.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataUser,
  fetchDeleteUser,
  setPage,
  setSearch,
} from "../../features/userSlice";
import Search from "../../components/input/Search";
import DeleteButton from "../../components/button/DeleteButton";
import DetailButton from "../../components/button/DetailButton";
import Swal from "sweetalert2";

// ICON
import AddButton from "../../components/button/AddButton";
import { useState } from "react";
import InputUser from "./InputUser";

export default function User() {
  const dispatch = useDispatch();
  const { users, page, search } = useSelector((state) => state.user);
  const [modal, setModal] = useState(false)

  const itemsPerPage = 10; // Jumlah item per halaman
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  const modalHandler = ()=>{
    setModal((prev)=>!prev)
  }

  const handleSearchChange = (keyword) => {
    dispatch(setSearch(keyword));
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(fetchDeleteUser(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchDataUser());
  }, [dispatch, page, search]);
  return (
    <div className="page-container">
      <h1>Manage User</h1>
      <div className="page-fitur">
        <Search
          value={search}
          handleSearch={(e) => handleSearchChange(e.target.value)}
        />
        <AddButton setModal={modalHandler}>Admin</AddButton>
      </div>
      <table className="table-column">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index + 1}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="td-action">
                  <DeleteButton handleDelete={() => handleDeleteUser(user.id)}>
                    Delete
                  </DeleteButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Tidak ada data user</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={page === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
      {modal && <InputUser modal={modalHandler}/>}
    </div>
  );
}
