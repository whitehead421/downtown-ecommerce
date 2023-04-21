import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { theme } from "../themes";
import { saveAddress, getAdresses, deleteAddress } from "../redux/apiCalls";
import { addAddress } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { DeleteOutline, Edit } from "@material-ui/icons";
import { mobile, tablet, laptop } from "../responsive";

const Address = ({ setCheckoutAddress }) => {
  const [addressTitle, setAddressTitle] = useState("");
  const [address, setAddress] = useState("");
  const [userAddress, setUserAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.user.currentUser.uid);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getAdresses(userId)
      .then((res) => {
        setUserAddress(res);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {});
  }, [userId]);

  if (isLoading) {
    return <Loading />;
  }

  const handleAddress = (e) => {
    setAddress(e.target.value.toUpperCase());
  };

  const handleAddressTitle = (e) => {
    setAddressTitle(e.target.value);
  };

  const handleSave = () => {
    saveAddress({ userId, addressTitle, address })
      .then(() => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNewAddress = () => {
    setUserAddress([]);
  };

  const handleDelete = async (e) => {
    await deleteAddress(e.target.id).then(() => {
      window.location.reload(false);
    });
  };

  const handleChoose = (e) => {
    dispatch(addAddress(userAddress[e.target.id]._id));
    setCheckoutAddress(userAddress[e.target.id]._id);
  };

  return (
    <Container>
      {userAddress?.length === 0 ? (
        <>
          <div className="add-address">
            <input
              type="text"
              placeholder="Address Title"
              onChange={handleAddressTitle}
            />
            <textarea placeholder="Address" onChange={handleAddress} />
            <button onClick={handleSave}>SAVE ADDRESS</button>
          </div>
        </>
      ) : (
        userAddress?.map((address, index) => {
          return (
            <div className="collider" key={index}>
              <div className="title">
                <span className="title">{address.addressTitle}</span>
                <input
                  name="choose"
                  type="radio"
                  id={index}
                  onChange={handleChoose}
                />
              </div>
              <div className="address">{address.address}</div>
              <div className="edit">
                <span className="delete">
                  <DeleteOutline id={address._id} onClick={handleDelete} />
                </span>
                <span className="edit">
                  <Edit />
                </span>
              </div>
            </div>
          );
        })
      )}{" "}
      {userAddress?.length !== 0 ? (
        <>
          <div className="add-new" onClick={handleNewAddress}>
            +
          </div>
        </>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  align-items: center;

  div.add-address {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  div.add-new {
    display: flex;
    align-items: center;
    color: ${theme.primaryColor};
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    padding: 5px 10px;
    transition: all 0.5s ease;
    font-size: 20px;
    font-weight: 500;
    &:hover {
      background-color: ${theme.primaryColor};
      color: white;
      cursor: pointer;
      transform: scale(1.2);
    }
  }

  div.collider {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin: 10px 10px;
    width: 30%;
    display: inline-table;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    ${mobile({ width: "100%" })}
    div.title {
      display: flex;
      align-items: center;
      background-color: rgb(250, 250, 250);
      padding: 5px;
      border-bottom: 1px solid #e2e2e2;
      span.title {
        margin: 0 10px;
        flex: 4;
        text-align: left;
        font-weight: 500;
      }
      input[type="radio"] {
        flex: 1;
        margin-right: 10px;
        appearance: none;
        width: 200px;
        border: 1px solid #e2e2e2;
        outline: none;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        ${mobile({ width: "100%" })}
        &:hover {
          background-color: ${theme.primaryColor};
        }

        ::before {
          content: "SELECT";
          font-size: 12px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &:checked {
          text-align: center;
          font-size: 12px;
          ::before {
            content: "";
          }
          ::after {
            content: "SELECTED";
            color: #fff;
          }
          background-color: ${theme.secondaryColor};
        }
      }
    }

    div.address {
      display: flex;
      justify-content: flex-start;
      text-align: left;
      height: 100px;
      padding: 20px;
      white-space: pre-wrap;
      overflow-y: auto;
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-thumb {
        transition: all 1s ease-in-out;
        background-color: #e2e2e2;
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
        :hover {
          background-color: ${theme.primaryColor};
        }
      }
    }
    div.edit {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px;
      span.delete {
        transition: all 0.3s ease;
        &:hover {
          cursor: pointer;
          color: red;
          transform: scale(1.1);
        }
      }
      span.edit {
        transition: all 0.5s ease;
        &:hover {
          cursor: pointer;
          color: green;
          transform: scale(1.1);
        }
      }
    }
    ${tablet({ justifyContent: "center", width: "100%" })}
    ${laptop({ justifyContent: "center", width: "100%" })}
  }

  span {
    margin-top: 10px;
  }
  p {
    margin-top: 10px;
    word-wrap: break-word;
  }
  input {
    flex: 1;
    width: 30%;
    margin: 10px;
    padding: 20px;
    border: none;
    outline: none;
    background-color: rgb(230, 230, 230);
    :focus {
      transition: all 0.3s ease;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      ::placeholder {
        color: #e2e2e2;
      }
    }
  }
  textarea {
    flex: 1;
    width: 30%;
    margin: 10px;
    padding: 20px;
    border: none;
    outline: none;
    background-color: rgb(230, 230, 230);
    :focus {
      transition: all 0.3s ease;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      ::placeholder {
        color: #e2e2e2;
      }
    }
  }
  button {
    background-color: ${theme.primaryColor};
    color: white;
    border-radius: 5px;
    padding: 20px 30px;
    margin: 10px;
    cursor: pointer;
    transition: 0.5s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
export default Address;
