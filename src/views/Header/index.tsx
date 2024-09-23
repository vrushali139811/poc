import { IoArrowBack } from 'react-icons/io5';
import styles from './Header.module.scss'





interface HeaderProps {
    title: string;  // Define title as a string
    step: number;
    onBackHandler?:()=>void
}

const Header: React.FC<HeaderProps> = ({ title, step,onBackHandler }) => {

  
 
    return (
        <div className={styles.container}>
            {step > 1 && <IoArrowBack color='white' className={styles.icon} onClick={onBackHandler} />}
            <p className={styles.title}>

                {title}
            </p>
        </div>
    );
};


export default Header