import React from "react";
import styles from "@/styles/product.module.css";
import Image from "next/image";
import mongoose from "mongoose";
import { onmimartSchema } from "@/db/schema.js";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const page = async ({ params }) => {
  const id = params.id;
  const data = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await data.json();
  mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);

  const cart = async (formData) => {
    "use server";
    const count = formData.get("count") || 1;
    const supabase = createServerActionClient({ cookies });
    const { data: user } = await supabase.auth.getSession();
    const Data = mongoose.model("data", onmimartSchema);
    const oldData = await Data.findOne({ email: user.session.user.email });
    if (!oldData) {
      const newData = new Data({
        email: user.session.user.email,
        cart: [],
      });
      newData.cart[id] = count;
      return await newData.save();
    }
    if (oldData.cart[id]) {
      oldData.cart[id] += count;
    } else {
      oldData.cart[id] = count;
    }
    return await oldData.save();
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
        <div className={styles.rating}>
          <span className={styles.star}>{product.rating.rate}&#9733;</span>{" "}
          {product.rating.count} Ratings
        </div>
        <div className={styles.price}>${product.price}</div>
        <div className={styles.description}>{product.description}</div>
        <form action={cart}>
          <span className={styles.quantity}>
            Quantity:{" "}
            <select className={styles["count-select"]} name="count" id="count">
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </span>{" "}
          <button type="submit" className={styles["add-to-cart"]}>
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
