import {fetchLocation } from "@/app/lib/data";
import { updateLocation } from "@/app/lib/location/actions";
import styles from "@/app/ui/dashboard/customers/singleCustomer/customers.module.css";
import Image from "next/image";

const SingleLocation = async ({ params }) => {
  
  const { id } = params;
  const location = await fetchLocation(id);

  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {location.name}
      </div>
      <div className={styles.formContainer}>
        <form action={updateLocation} className={styles.form}>
          <input type="hidden" name="id" value={location.id}/>
          <label>Name</label>
          <input type="text" name="depo_name" placeholder={location.depo_name} />
          <label>Country</label>
          <input type="text" name="country" placeholder={location.country} />
          <label>City</label>
          <input type="text" name="city" placeholder={location.city} />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleLocation;