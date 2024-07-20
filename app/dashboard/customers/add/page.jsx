import styles from "@/app/ui/dashboard/customers/addCustomers/addCustomers.module.css";

const AddCustomer = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="Name" name="name" required />
        <input type="email" placeholder="Email" name="email" required />
        <input type="number" placeholder="Tel" name="tel" />
        <select name="cat" id="cat">
          <option value="general">Country</option>
          <option value="kenya">Kenya</option>
          <option value="uganda">Uganda</option>
          <option value="tanzania">Tanzania</option>
        </select>
        <input type="text" placeholder="City" name="city" required />
        <input type="text" placeholder="Account No." name="account" required />
        <select name="isActive" id="isActive">
          <option value={true}>
            Is Active?
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCustomer;