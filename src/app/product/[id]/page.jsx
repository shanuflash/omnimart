import React from "react";
import styles from "@/styles/product.module.css";
import Image from "next/image";
import mongoose from "mongoose";
import { onmimartSchema } from "@/db/schema.js";

const page = async ({ params }) => {
  const id = params.id;
  const data = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await data.json();
  mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
  const db = mongoose.connection;
  db.once("open", () => {
    console.log("connected to database");
  });

  const cart = async () => {
    "use server";

    const Data = mongoose.model("data", onmimartSchema);
    const addCart = new Data({
      email: "test@test.com",
      cart: ["ezzz"],
    });
    addCart.save();
    console.log("cart");
  };

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
        <form action={cart}>
          <button type="submit" className={styles["add-to-cart"]}>
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
