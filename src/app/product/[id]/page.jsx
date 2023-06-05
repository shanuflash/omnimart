import React from "react";
import styles from "@/styles/product.module.css";

const page = async ({ params }) => {
  const id = params.id;
  const data = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await data.json();

  return <div className={styles.product}>{product.title}</div>;
};

export default page;
