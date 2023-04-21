import { logOutSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";
import { orderFailure, orderStart } from "./orderRedux"; //TODO orderSucces eklenecek

// ORDER

export const saveOrder = async (order, dispatch) => {
  dispatch(orderStart());
  try {
    await publicRequest.post("/orders", order);
  } catch (err) {
    dispatch(orderFailure());
  }
};

export const getOrders = async (userId, dispatch) => {
  dispatch(orderStart());
  try {
    const res = await publicRequest.get(`/orders/find/${userId}`);
    return res.data;
  } catch (err) {
    dispatch(orderFailure());
  }
};

// ADDRESS
export const saveAddress = async (address) => {
  try {
    publicRequest.post("/address", address);
  } catch (err) {
    console.log(err);
  }
};

export const getAdresses = async (userId) => {
  try {
    const res = await publicRequest.get(`/address/find/${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getOneAddress = async (addressID) => {
  try {
    const res = await publicRequest.get(`/address/findone/${addressID}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteAddress = async (addressId) => {
  try {
    await publicRequest.delete(`/address/${addressId}`);
  } catch (err) {
    console.log(err);
  }
};

export const updateAddress = async (addressId, address) => {
  try {
    await publicRequest.put(`/address/${addressId}`, address);
  } catch (err) {
    console.log(err);
  }
};

export const imageUpload = async (image) => {
  try {
    await publicRequest
      .post("/images/post", image.formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // formdata for file uploads
        },
      })
      .then((res) => {
        console.log(res);
      });
  } catch (err) {
    return err;
  }
};

export const imageDelete = async (productID) => {
  try {
    await publicRequest.delete(`/images/${productID}`);
  } catch (err) {
    console.log(err);
  }
};

// ADD NOTE
export const addNote = async (note) => {
  try {
    await publicRequest.post("/note", note);
  } catch (err) {
    return err;
  }
};

// GET NOTE
export const getNote = async (productID) => {
  try {
    const res = await publicRequest.get(`/note/find/${productID}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// DELETE NOTE
export const deleteNote = async (productID) => {
  try {
    await publicRequest.delete(`/note/find/${productID}`);
  } catch (err) {
    console.log(err);
  }
};

// AUTHENTICATION

export const logOut = async (dispatch) => {
  dispatch(logOutSuccess());
};
