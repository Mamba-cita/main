import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css"
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import { auth, signOut } from "@/app/auth";


const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
    
      {
        title: "Orders",
        path: "/dashboard/orders",
        icon: <MdShoppingBag />,
      },
      {
        title: "Moves",
        path: "/dashboard/moves",
        icon: <MdAttachMoney />,
      },
      {
        title: "Fuel",
        path: "/dashboard/fuel",
        icon: <MdAttachMoney />,
      },
      {
        title: "Trip Expenses",
        path: "/dashboard/trip",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Invoices",
        path: "/dashboard/invoices",
        icon: <MdAnalytics />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "Registry",
    list: [
      {
        title: "Customers",
        path: "/dashboard/customers",
        icon: <MdPeople />,
      },
      {
        title: "Truck",
        path: "/dashboard/truck",
        icon: <MdWork />,
      },
      {
        title: "Trailer",
        path: "/dashboard/trailer",
        icon: <MdAnalytics />,
      },
      {
        title: "Driver",
        path: "/dashboard/driver",
        icon: <MdPeople />,
      },
      {
        title: "Locations",
        path: "/dashboard/location",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];
const Sidebar = async () => {
  const {user} = await auth();
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={ user.img || '/noavatar.png'}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.userTitle}>{user.role}</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
}

export default Sidebar