import Order from "./Order";
import { getOrders } from "../redux/apiCalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getOrders(user.uid, dispatch).then((res) => {
      setOrders(res);
      setIsLoading(false);
    });
  }, [user.uid, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 style={{ fontWeight: "200", marginTop: "20px" }}>Orders</h1>
      {orders?.map((order) => (
        <Order order={order} key={order._id} />
      ))}
      {orders?.length === 0 && (
        <h2 style={{ fontWeight: "200", marginTop: "20px" }}>
          You have no orders yet.
        </h2>
      )}
    </div>
  );
};

export default Orders;
