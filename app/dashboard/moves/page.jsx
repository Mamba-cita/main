import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/customers/customers.module.css";
import Link from "next/link";
import { deleteCustomer } from "@/app/lib/actions";
import { fetchCustomers } from "@/app/lib/data";

const Customers = async ({searchParams}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, customers } = await fetchCustomers(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a customer..." />
        <Link href="/dashboard/customers/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone Number</td>
            <td>Country</td>
            <td>Created At</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.country}</td>
              <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
              <td>{customer.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/customers/${customer.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteCustomer}>
                    <input type="hidden" name="id" value={(customer.id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
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

export default Customers;
