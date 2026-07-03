import React, { useEffect } from "react";
import Loader from "../Common/Loader";
import apiClient from "../../utils/ApiClient";

const Sellers = () => {
  const [name, setName] = React.useState("");
  const [sellers, setSellers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState();

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => {
  //       setSellers(res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching sellers:", err);
  //       setErrors("Error fetching sellers: " + err.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/users");
      setSellers(res.data);
    } catch (err) {
      console.error("Error fetching sellers:", err);
      setErrors("Error fetching sellers: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSellers();
  }, []);

  const addSeller = async () => {
    setErrors(null);
    if (name.trim() === "") {
      setErrors("Seller name cannot be empty.");
      return;
    }
    const newSeller = {
      id: sellers.length + 1,
      name: name,
    };
    setSellers([newSeller, ...sellers]);
    setName("");
    try {
      const response = await apiClient.post("/users", newSeller);
      setSellers([response.data, ...sellers]);
    } catch (err) {
      console.error("Error adding seller:", err);
      setErrors("Error adding seller: " + err.message);
      setSellers(sellers);
    }
  };

  const deleteSeller = async (id) => {
    try {
      setSellers(sellers.filter((seller) => seller.id !== id));
      const response = await apiClient.delete(`/users/${id}`);
    } catch (err) {
      console.error("Error deleting seller:", err);
      setErrors("Error deleting seller: " + err.message);
      setSellers(sellers);
    }
  };

  return (
    <>
      <h3>Admin Sellers Page</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addSeller}>Add Seller</button>
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      {errors && <em style={{ color: "red" }}>{errors}</em>}

      <table>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller.id}>
              <td> {seller.name}</td>
              <td>
                {" "}
                <button onClick={() => deleteSeller(seller.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Sellers;
