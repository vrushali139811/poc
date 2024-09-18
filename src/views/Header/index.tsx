import styles from './Header.module.scss'





interface HeaderProps {
    title: string;  // Define title as a string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <p className={styles.title}>
            {title}
        </p>
    );
};


export default Header