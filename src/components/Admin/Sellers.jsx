import React, { useEffect, useState } from "react";
import Loader from "../Common/Loader";
import useSellers from "../../hooks/sellers/useSellers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/ApiClient";
import useAddSeller from "./../../hooks/sellers/useAddSeller";
import useDeleteSeller from "../../hooks/sellers/useDeleteSeller";

const Sellers = () => {
  const [name, setName] = useState("");
  const { data: sellers, error, isLoading } = useSellers();
  const queryClient = useQueryClient();

  const deleteSellerMutation = useDeleteSeller();
  const addSellerMutation = useAddSeller();

  const addSeller = async () => {
    const newSeller = {
      id: sellers.length + 1,
      name: name,
    };
    addSellerMutation.mutate(newSeller);
  };

  const deleteSeller = (id) => {
    deleteSellerMutation.mutate(id, {
      onSuccess: () => {
        queryClient.setQueryData(["sellers"], (sellers = []) =>
          sellers.filter((seller) => seller.id !== id),
        );
      },
    });
  };

  const displayError =
    error ?? addSellerMutation.error ?? deleteSellerMutation.error;

  return (
    <>
      <h3>Admin Sellers Page</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addSeller} disabled={addSellerMutation.isPending}>
        {addSellerMutation.isPending ? "Adding seller..." : "Add Seller"}
      </button>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {displayError && <em style={{ color: "red" }}>{displayError.message}</em>}

      <table>
        <tbody>
          {sellers?.map((seller) => (
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
