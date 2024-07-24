import styles from "@/app/ui/dashboard/order/addOrder.module.css";
import { addOrder } from "@/app/lib/demand/order/actions";
import { fetchCustomers, fetchLocations } from "@/app/lib/data";

const AddOrder = async () => {
  const { customers } = await fetchCustomers();
  const { locations } = await fetchLocations();

  return (
    <div className={styles.container}>
      <form action={addOrder} className={styles.form}>
        <select name="workflow" id="workflow">
          <option value="">Select Workflow</option>
          <option value="container">Container</option>
          <option value="b&b">B&B</option>
        </select>
        <select name="client" required>
          <option value="">Select Client</option>
          {customers.map(customer => (
            <option key={customer._id} value={customer._id}>{customer.name}</option>
          ))}
        </select>
        <select name="origin" required>
          <option value="">Select Origin</option>
          {locations.map(location => (
            <option key={location._id} value={location._id}>{location.city}</option>
          ))}
        </select>
        <select name="des" required>
          <option value="">Select Destination</option>
          {locations.map(location => (
            <option key={location._id} value={location._id}>{location.city}</option>
          ))}
        </select>
      
        <input
          type="number"
          placeholder="Trucks Needed"
          name="trucks_needed"
          required
        />
        <input type="number" placeholder="Cargo Rate" name="cargo_rate" required />
        <select name="rate_type" id="rate_type">
          <option value="">Rate Type</option>
          <option value="per ton">Per Ton</option>
          <option value="truckload">Truck Load</option>
          <option value="km">KM</option>
        </select>
        <select name="rate_currency" id="rate_currency">
          <option value="">Currency</option>
          <option value="ksh">KSH</option>
          <option value="usd">USD</option>
          <option value="tzn">TZD</option>
        </select>
        <input type="text" placeholder="Payment Terms" name="payment_terms" required />
        <input type="text" placeholder="Agent" name="agent" />
        <input type="text" placeholder="Vessel" name="vessel" />
        <input type="text" placeholder="Loading Contact" name="load_cont" />
        <input type="text" placeholder="Offloading Contact" name="off_cont" />
        <input type="text" placeholder="Commodity" name="commodity" required />
        <input type="text" placeholder="Packaging" name="packaging" required />
        <input type="text" placeholder="Trailer Types" name="trailer_types" required />
        <input type="date" placeholder="Load Date" name="load_date" required />
        <input type="date" placeholder="Last Load Date" name="last_load_date" required />
        <input type="text" placeholder="LPO" name="lpo" />

        <div className={styles.buttonContainer}>
          <a href="/dashboard/orders" className={styles.cancelButton}>
            Cancel
          </a>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
