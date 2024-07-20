import { updateCustomer } from "@/app/lib/actions";
import { fetchCustomer } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/customers/singleCustomer/customers.module.css";
import Image from "next/image";

const SingleCustomer = async ({ params }) => {
  
  const { id } = params;
  const customer = await fetchCustomer(id);

  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {customer.name}
      </div>
      <div className={styles.formContainer}>
        <form action={updateCustomer} className={styles.form}>
          <input type="hidden" name="id" value={customer.id}/>
          <label>customer</label>
          <input type="text" name="name" placeholder={customer.name}/>
          <label>Email</label>
          <input type="email" name="email" placeholder={customer.email} />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={customer.phone} />
          <label>City</label>
          <input type="text" name="city" placeholder={customer.city} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected={customer.isAdmin}>Yes</option>
            <option value={false} selected={!customer.isAdmin}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={customer.isActive}>Yes</option>
            <option value={false} selected={!customer.isActive}>No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleCustomer;