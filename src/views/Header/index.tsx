import styles from './Header.module.scss'





const Header=({title})=>{
    return(
        <p className={styles.title}>
            {title}
        </p>
    )
}


export default Header