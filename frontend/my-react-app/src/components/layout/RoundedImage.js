import styles from './RoundedImage.module.css';

function RoundedImage({ src, alt, width }) {
    return (
        <img
            src={src}
            alt={alt}
            className={`${styles.rounded_image} ${width ? styles[width] : ''}`}
        />
    );
}

export default RoundedImage;