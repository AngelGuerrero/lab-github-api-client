import React, { useState } from "react";
import "./App.css";
import UsersList from "./components/UsersList";
import InputForm from "./components/InputForm";
import { searchUsersByName } from "./endpoint";

export default function App() {
  const [users, setUsers] = useState([]);

  const [inputSearch, setInputSearch] = useState("");

  /**
   * EVENTS
   *
   * Perform events from components using via callback
   */
  const performSearch = async () => {
    const getUsers = await searchUsersByName(inputSearch);
    setUsers([...getUsers.data]);
  };

  const handleInputChange = (e) => setInputSearch(e.target.value);

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && inputSearch !== "") {
      setUsers([]);
      performSearch();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>GitHub search API client</h1>

        <InputForm
          bindValue={inputSearch}
          onChangeHandle={handleInputChange}
          onKeyPressHandle={(e) => handleInputKeyPress(e)}
        />

        {users.length >= 1 ? <UsersList users={users} /> : null}
      </div>
    </div>
  );
}
