import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/customers/customers.module.css";
import Image from "next/image";
import Link from "next/link";

const Customers = () => {
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
          {/* User rows will be dynamically generated */}
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Edwin John
              </div>
            </td>
            <td>edwinjohn@example.com</td>
            <td>+1 123 456 7890</td>
            <td>USA</td>
            <td>12.01.2022</td>
            <td>Active</td>
            <td>
              <Link href="">
                <button className={`${styles.button} ${styles.view}`}>
                  View
                </button>{" "}
              </Link>
              <button className={`${styles.button} ${styles.delete}`}>
                Delete
              </button>{" "}
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination  />

    </div>
  );
};

export default Customers;
