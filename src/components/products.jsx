import Image from "next/image";
import styles from "../styles/products.module.css";
import Link from "next/link";

const products = async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  const products = await data.json();
  return (
    <div className={styles.products}>
      <div className={styles.title}>Products</div>
      <div className={styles.items}>
        {products?.map((product) => {
          return (
            <Link
              href={`product/${product.id}`}
              className={styles.card}
              key={product.id}
            >
              <div className={styles["card-category"]}>{product.category}</div>
              <Image
                src={product.image}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  height: "70%",
                  width: "100%",
                  objectFit: "contain",
                  alignSelf: "center",
                }}
              />
              <div className="footer">
                <div className={styles["card-title"]}>{product.title}</div>
                <div className={styles["card-price"]}>${product.price}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default products;
