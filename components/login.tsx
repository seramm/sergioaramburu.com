"use client";

import { Alert, Button, Field, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { login } from "./api";
import { useRouter } from "next/router";
import { PasswordInput } from "./ui/password-input";
import { useState } from "react";

interface FormValues {
  username: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const token = await login(data.username, data.password);
      localStorage.setItem("access_token", token);
      const redirectTo = localStorage.getItem("redirectTo") || "/";
      router.push(redirectTo);
    } catch (err: any) {
      setLoginError("Login failed");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        {loginError && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{loginError}</Alert.Title>
            </Alert.Content>
          </Alert.Root>
        )}
        <Field.Root invalid={!!errors.username}>
          <Field.Label>Username</Field.Label>
          <Input
            {...register("username", { required: "Username is required" })}
          />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <PasswordInput
            {...register("password", { required: "Password is required" })}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}
