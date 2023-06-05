import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function Login() {
  const handleSignUp = async (formData) => {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signUp({
      email,
      password,
    });

    revalidatePath("/");
  };

  const handleSignIn = async (formData) => {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    revalidatePath("/");
  };

  const handleSignOut = async () => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();
    revalidatePath("/");
  };

  return (
    <form action={handleSignUp}>
      <input name="email" />
      <input type="password" name="password" />
      <button>Sign up</button>
      <button formAction={handleSignIn}>Sign in</button>
      <button formAction={handleSignOut}>Sign out</button>
    </form>
  );
}
