import React from 'react';
import { fetchOrders } from '@/app/lib/data';
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/customers/customers.module.css";
import Link from "next/link";
import { deleteOrder } from '@/app/lib/demand/order/actions';

const Orders = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  // Fetch orders
  const { count, orders } = await fetchOrders(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for an order..." />
        <Link href="/dashboard/orders/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Order No.</td>
            <td>Client</td>
            <td>Origin</td>
            <td>Destination</td>
            <td>Workflow</td>
            <td>Rate</td>
            <td>Container</td>
            <td>Empty Return</td>
            <td>Status</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.order_number}</td>
              <td>{order.client.name}</td>
              <td>{order.origin.depo_name}</td>
              <td>{order.des.depo_name}</td>
              <td>{order.workflow}</td>
              <td>{order.cargo_rate}</td>
              <td>{order.cont_no}</td>
              <td>{order.des.depo_name}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/orders/${order.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                  <form action={deleteOrder}>
                    <input type="hidden" name="id" value={order.id} />
                    <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default Orders;
