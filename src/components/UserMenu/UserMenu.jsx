import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import styles from './UserMenu.module.css';
import { toast } from 'react-hot-toast';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out');
    } catch  {
      toast.error('Logout failed');
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Welcome, {name}!</p>
      <button className={styles.btn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
