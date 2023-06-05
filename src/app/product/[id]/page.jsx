import React from "react";
import styles from "@/styles/product.module.css";
import Image from "next/image";

const page = async ({ params }) => {
  const id = params.id;
  const data = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await data.json();

  return (
    <div className={styles.product}>
      <div className={styles.preview}>
        <Image
          src={product.image}
          width={400}
          height={400}
          style={{ objectFit: "contain" }}
          alt={product.title}
        />
      </div>

      <div className={styles.details}>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>${product.price}</div>
        <div className={styles.description}>{product.description}</div>
        <button className={styles['add-to-cart']}>Add to Cart</button>
      </div>
    </div>
  );
};

export default page;
