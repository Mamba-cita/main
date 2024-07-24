
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/main.module.css";
import Link from "next/link";
import { fetchLocations } from "@/app/lib/data";
import { deleteLocation } from "@/app/lib/location/actions";

const Location = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, locations } = await fetchLocations(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a location..." />
        <Link href="/dashboard/location/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Country</td>
            <td>City</td>
            {/* <td>Created</td> */}
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
            <td>{location.depo_name}</td>
              <td>{location.country}</td>
              <td>{location.city}</td>
              {/* <td>{location.createdAt?.toString().slice(4, 16)}</td> */}
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/location/${location.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteLocation}>
                    <input type="hidden" name="id" value={(location.id)} />
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

export default Location;