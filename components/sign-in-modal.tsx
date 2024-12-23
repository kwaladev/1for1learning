"use client";

import Image from "next/image";
import React, { useState } from "react";

import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import * as Icons from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { useSigninModal } from "@/hooks/use-signin-modal";

export const SignInModal = ({ dict }: { dict: Record<string, string> }) => {
  const signInModal = useSigninModal();
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href={siteConfig.url}>
            <Image
              src="/images/avatars/koala.svg"
              className="mx-auto"
              width="64"
              height="64"
              alt=""
            />
          </a>
          <h3 className="font-urban text-2xl font-bold">{dict.signup}</h3>
          <p className="text-sm text-gray-500">{dict.privacy}</p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <Button
            variant="default"
            disabled={signInClicked}
            onClick={() => {
              setSignInClicked(true);
            }}
          >
            {signInClicked ? (
              <Icons.Spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.GitHub className="mr-2 size-4" />
            )}{" "}
            {dict.signup_github}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
