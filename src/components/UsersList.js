import React, { useState } from "react";
import { getUserProfile } from "./../endpoint";
import styled from "styled-components";

/**
 * Styles
 */
const CardBackgroundColor = "#fff";
const TitleColor = "#495057";
const PColor = "#6C757D";
const LinkColor = "#7B2CBF";

const Card = styled.div`
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  background-color: ${CardBackgroundColor};
  border-radius: 4px;
  box-shadow: 5px 5px 35px lightgray;
  transition: all 1s;

  &:hover {
    box-shadow: none;
  }

  @media screen and (min-width: 748px) {
    flex-direction: row;
  }
`;

const CardHeader = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;

  @media screen and (min-width: 748px) {
    width: 35%;
    flex-grow: 1;
  }

  .card__img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 50%;
  }
  .card__title {
    font-size: 16px;
    color: ${TitleColor};
  }
`;

const Button = styled.button`
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 5px 8px;
  background-color: whitesmoke;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
`;

const CardContent = styled.div`
  flex-grow: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content__title {
    color: ${TitleColor};
  }
  .title--username {
    text-align: center;
    color: darkgoldenrod;
  }
  a {
    text-decoration: none;
  }
  p {
    color: ${PColor};
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;

  .card-footer__col {
    flex-grow: 1;
    display: flex;
  }
`;

const Link = styled.a`
  flex-grow: 1;
  padding: 10px 0px;
  text-align: center;
  font-size: 14px;
  color: ${LinkColor};
  transition: all 0.5s;
  &:visited {
    color: black;
  }
  &:hover {
    background-color: #ebebeb;
    color: blue;
    box-shadow: 5px 5px 20px whitesmoke;
  }
`;

/**
 * EVENTS
 *
 * Perform events from components
 */

const UserProfile = ({ user }) => {
  if (!user.profile) return null;

  return (
    <CardContent>
      <h2 className="content__title title--username">{user.profile.name}</h2>
      <h3 className="content__title title--bio">Bio</h3>
      <p className="profile__bio">{user.profile.bio}</p>
      <p>{user.profile.location}</p>
      <CardFooter>
        <div className="card-footer__col">
          <Link href={user.repos_url} target="_blank" rel="noopener noreferrer">
            Repositories
          </Link>
        </div>
        <div className="card-footer__col">
          <Link
            href={user.profile.blog}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </Link>
        </div>
      </CardFooter>
    </CardContent>
  );
};

const UsersList = ({ users }) => {
  const [localUsers, setLocalUsers] = useState(users);

  const updateObjectFromList = (user, propertyName, newData) => {
    const newlist = localUsers.map((el) => {
      if (el.id === user.id) {
        const updatedItem = { ...el, [propertyName]: newData };
        return updatedItem;
      }

      return el;
    });

    setLocalUsers([...newlist]);
  };

  const handleGetUserProfile = async (user) => {
    const getvalUserProfile = await getUserProfile(user.login);

    if (getvalUserProfile.error) {
      console.log(`Something went wrong: ${getvalUserProfile.message}`);
      return getvalUserProfile;
    }

    updateObjectFromList(user, "profile", getvalUserProfile.data);
  };

  return (
    <div>
      {localUsers.map((user) => (
        <Card key={user.id}>
          <CardHeader thereAreCardContent={user}>
            <img
              className="card__img"
              src={user.avatar_url}
              alt="User avatar"
            />
            <h2 className="card__title">{user.login}</h2>
            <Button onClick={() => handleGetUserProfile(user)}>
              {user.profile ? "Recargar datos" : "Cargar perfil"}
            </Button>
          </CardHeader>
          <UserProfile user={user} />
        </Card>
      ))}
    </div>
  );
};

export default UsersList;
