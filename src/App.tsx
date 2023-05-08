import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function IndexPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = (data: FormData) => {
    setFormSubmitted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Please write down your name." })}
          />
          {errors?.name?.message}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Only @naver.com"
            {...register("email", {
              required: "Please write down your Email",
              validate: {
                naver: (text) => text.includes("@naver.com"),
              },
            })}
          />
          {errors?.email?.message}
          {errors?.email?.type === "naver"
            ? "Only @naver emails allowed"
            : null}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Min 10 characters"
            {...register("password", {
              required: "Please write down your password",
              minLength: {
                value: 10,
                message: "Password must be at least 10 characters",
              },
            })}
          />
          {errors?.password?.message}
        </div>
        <button type="submit">Log in</button>
      </form>
      {formSubmitted && <p>Thank you!</p>}
    </>
  );
}
