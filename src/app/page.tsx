"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [permisions, setPermisions] = useState<string[]>([]);
  const [newPermision, setNewpermision] = useState("");
  const getPermision = () => {
    fetch("http://localhost:3000/api/v1/permisions")
      .then((response) => response.json())
      .then((data) => {
        const allPermisions = data.map((permision: any) => permision.name);
        setPermisions(() => [ ...allPermisions]);
      });
  };
  const savePermision = () => {
    fetch("http://localhost:3000/api/v1/permisions", {
      method: "POST", // or 'PUT'
      body: JSON.stringify({ name: newPermision }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(() => {
        getPermision()
      });
  };
  useEffect(() => {
    getPermision();
  }, []);
  return (
    <>
      <div className="up-container p-10">
        <label htmlFor="newPermision">Nuevo permiso: </label>
        <input
          className="bg-gray-200"
          type="text"
          name="newPermision"
          id="newPermision"
          value={newPermision}
          onChange={(e) => setNewpermision(e.target.value)}
        />
        <div className="mt-5">
          <button
            onClick={savePermision}
            className=" text-black px-2 py-1 rounded "
          >
            ADD
          </button>
        </div>
      </div>
      <div className="permisions-container p-10">
        {permisions.map((permision) => (
          <div key={permision}>{permision}</div>
        ))}
      </div>
    </>
  );
}
