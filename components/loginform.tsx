"use client";

import { chakra, Button, Field, Input, Spinner, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { login } from "api/auth";
import { useRouter } from "next/router";
import { PasswordInput } from "./ui/password-input";
import { useEffect, useState } from "react";
import { useAuth } from "context/session";
import { Check, CircleAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  base64URLStringToBuffer,
  PublicKeyCredentialRequestOptionsJSON,
  startAuthentication,
} from "@simplewebauthn/browser";

const MotionBox = motion(chakra.div);

interface FormValues {
  username: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState<
    "idle" | "waiting" | "success" | "error"
  >("idle");
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (loginStatus === "error") {
      const timer = setTimeout(() => {
        setLoginStatus("idle");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [loginStatus]);

  // const onSubmit = handleSubmit(async (data) => {
  //   setLoginStatus("waiting");
  //   try {
  //     const user = await login(data.username, data.password);
  //     setUser(user);
  //     localStorage.setItem("user", JSON.stringify({ username: data.username }));
  //
  //     const redirectTo = localStorage.getItem("redirectTo") || "/";
  //     router.push(redirectTo);
  //   } catch (err: any) {
  //     setLoginStatus("error");
  //   }
  // });

  const onSubmit = handleSubmit(async (data) => {
    setLoginStatus("waiting");
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("password", data.password);
    const authResp = await fetch(
      "https://sergioaramburu.com/api/fido/auth/begin",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      },
    );
    let opts = await authResp.json();

    //  PublicKeyCredentialRequestOptionsJSON
    const optionsJSON = opts.publicKey;
    if (optionsJSON && optionsJSON.allowCredentials) {
      optionsJSON.allowCredentials = optionsJSON.allowCredentials.map(
        (cred: any) => ({
          ...cred,
          id: typeof cred.id === "string" ? cred.id : cred.id.toString(),
        }),
      );
    }
    let asseRep;
    try {
      asseRep = await startAuthentication({ optionsJSON: optionsJSON });
    } catch (error) {
      setLoginStatus("error");
      console.error(error.message);
      return;
    }

    const verificationResp = await fetch(
      "https://sergioaramburu.com/api/fido/auth/complete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          assertionResponse: asseRep,
        }),
      },
    );

    const verificationJSON = await verificationResp.json();
    console.log(verificationJSON);
    if (verificationJSON && verificationJSON.verified) {
      setLoginStatus("success");
    } else {
      setLoginStatus("error");
    }
  });

  function handleInputChange() {
    setLoginStatus("idle");
  }

  return (
    <form onSubmit={onSubmit} onChange={handleInputChange}>
      <Stack gap="4" align="flex-start" maxW="sm">
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

        <Button
          type="submit"
          colorPalette={loginStatus === "error" ? "red" : "gray"}
        >
          Login
          <AnimatePresence mode="wait">
            {loginStatus === "waiting" && (
              <MotionBox
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <Spinner />
              </MotionBox>
            )}
            {loginStatus === "success" && (
              <MotionBox
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <Check color="green" />
              </MotionBox>
            )}
            {loginStatus === "error" && (
              <MotionBox
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <CircleAlert />
              </MotionBox>
            )}
          </AnimatePresence>
        </Button>
      </Stack>
    </form>
  );
}
