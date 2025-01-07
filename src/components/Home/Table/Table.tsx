import React, { useState, useEffect } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data function
  const fetchData = async (page = 1, searchQuery = "") => {
    const response = await fetch(
      `https://api.razzakfashion.com/?paginate=${perPage}&search=${searchQuery}&page=${page}`
    );
    const result = await response.json();
    setData(result.data);
    setTotalPages(result.last_page);
    setCurrentPage(result.current_page);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Submit search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData(1, search);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    fetchData(page, search);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          style={{ padding: "5px", width: "300px" }}
        />
        <button type="submit" style={{ marginLeft: "5px" }}>
          Search
        </button>
      </form>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              padding: "5px 10px",
              marginRight: "5px",
              backgroundColor: currentPage === index + 1 ? "gray" : "white",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
