import Image from "next/image";
import styles from "../styles/products.module.css";

const products = async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  const products = await data.json();
  return (
    <div className={styles.products}>
      <div className={styles.title}>Products</div>
      <div className={styles.items}>
        {products?.map((product) => {
          return (
            <div className={styles.card} key={product.id}>
              <Image
                src={product.image}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  position: "absolute",
                  zIndex: "2",
                  height: "80%",
                  top: "10%",
                  width: "90%",
                  objectFit: "contain",
                }}
              />
              <div className={styles["card-title"]}>{product.title}</div>
              <div className={styles["card-price"]}>{product.price}</div>
              <div className={styles["card-category"]}>{product.category}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default products;
