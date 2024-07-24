import { addLocation } from "@/app/lib/location/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUsers.module.css";

const AddLocation = () => {
  return (
    <div className={styles.container}>
      <form action={addLocation} className={styles.form}>
      <select name="country" id="country">
          <option value="">Select Country</option>
          <option value="kenya">Kenya</option>
          <option value="uganda">Uganda</option>
          <option value="tanzania">Tanzania</option>
        </select> 
         <input type="text" placeholder="City" name="city" required />
        <input type="text" placeholder="Name" name="depo_name"  required/>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddLocation;