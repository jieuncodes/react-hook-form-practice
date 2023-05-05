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
  const [emailWarning, setEmailWarning] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = (data: FormData) => {
    setFormSubmitted(true);
  };
  const email = watch("email");
  const emailPattern = /^\S+@naver\.com$/i;

  if (email && !emailPattern.test(email) && !emailWarning) {
    setEmailWarning(true);
  } else if (email && emailPattern.test(email) && emailWarning) {
    setEmailWarning(false);
  }
  const password = watch("password");
  const passwordMinLength = 10;
  if (password && password.length < passwordMinLength && !passwordWarning) {
    setPasswordWarning(true);
  } else if (
    password &&
    password.length >= passwordMinLength &&
    passwordWarning
  ) {
    setPasswordWarning(false);
  }

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Please write down your name." })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Only @naver.com"
            {...register("email", {
              required: "Please write down your Email",
              pattern: {
                value: emailPattern,
                message: "only @naver email allowed",
              },
            })}
          />
          {emailWarning && <p>Please use a @naver.com email address</p>}
          {errors.email && <p>{errors.email.message}</p>}
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
          {passwordWarning && <p>Passsword has to be more than 10 chars</p>}
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Log in</button>
      </form>
      {formSubmitted && <p>Thank you!</p>}
    </>
  );
}
