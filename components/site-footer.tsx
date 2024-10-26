import * as React from "react";
import Image from "next/image";

import { cn } from "@/components/ui";

import { ModeToggle } from "@/components/mode-toggle";

function getCopyrightText(
  dict: Record<string, string | Record<string, string>>,
) {
  const currentYear = new Date().getFullYear();
  const copyrightTemplate = String(dict.copyright);
  return copyrightTemplate?.replace("${currentYear}", String(currentYear));
}

export function SiteFooter({
  className,
  dict,
}: {
  className?: string;
  params: {
    lang: string;
  };

  dict: Record<string, string | Record<string, string>>;
}) {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="relative bg-gradient-to-br from-[#fff1be] via-[#ee87cb] to-[#b060ff] dark:from-[#2d1d4a] dark:via-[#4a2d4a] dark:to-[#1d1d4a]">
        <div className="rounded-4xl absolute inset-2 bg-white/80 dark:bg-gray-800/80"></div>
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <div className="relative pb-16 pt-20 text-center sm:py-24">
              <hgroup>
                <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Get started
                </h2>
                <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 dark:text-gray-50 sm:text-5xl">
                  Ready to dive in?
                  <br />
                  Start your free trial today.
                </p>
              </hgroup>
              <p className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500 dark:text-gray-400">
                Get the cheat codes for selling and unlock your team's revenue
                potential.
              </p>
              <div className="mt-6">
                <a
                  className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-gray-950 px-4 py-[calc(theme(spacing.2)-1px)] text-base font-medium text-white shadow-md hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 sm:w-auto"
                  href="#"
                >
                  Get started
                </a>
              </div>
            </div>
            <div className="pb-16">
              <div className="group/row relative isolate pt-[calc(theme(spacing.2)+1px)] last:pb-[calc(theme(spacing.2)+1px)]">
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"
                >
                  <div className="absolute inset-x-0 top-0 border-t border-gray-200 dark:border-gray-700"></div>
                  <div className="absolute inset-x-0 top-2 border-t border-gray-200 dark:border-gray-700"></div>
                  <div className="absolute inset-x-0 bottom-0 hidden border-b border-gray-200 group-last/row:block dark:border-gray-700"></div>
                  <div className="absolute inset-x-0 bottom-2 hidden border-b border-gray-200 group-last/row:block dark:border-gray-700"></div>
                </div>
                <div className="grid grid-cols-2 gap-y-10 pb-6 lg:grid-cols-6 lg:gap-8">
                  <div className="col-span-2 flex">
                    <div className="group/item relative pt-6 lg:pb-6">
                      <svg
                        viewBox="0 0 15 15"
                        aria-hidden="true"
                        className="absolute -left-2 -top-2 hidden size-[15px] fill-gray-300 group-first/item:block dark:fill-gray-600"
                      >
                        <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
                      </svg>
                      <svg
                        viewBox="0 0 15 15"
                        aria-hidden="true"
                        className="absolute -right-2 -top-2 size-[15px] fill-gray-300 dark:fill-gray-600"
                      >
                        <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
                      </svg>
                      <svg
                        viewBox="0 0 15 15"
                        aria-hidden="true"
                        className="absolute -bottom-2 -left-2 hidden size-[15px] fill-gray-300 group-last/row:group-first/item:block dark:fill-gray-600"
                      >
                        <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
                      </svg>
                      <svg
                        viewBox="0 0 15 15"
                        aria-hidden="true"
                        className="absolute -bottom-2 -right-2 hidden size-[15px] fill-gray-300 group-last/row:block dark:fill-gray-600"
                      >
                        <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-4 lg:grid-cols-subgrid lg:pt-6">
                    <div>
                      <h3 className="text-sm/6 font-medium text-gray-950/50 dark:text-gray-50/50">
                        Product
                      </h3>
                      <ul className="mt-6 space-y-4 text-sm/6">
                        <li>
                          <a
                            className="font-medium text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                            href="/pricing"
                          >
                            Pricing
                          </a>
                        </li>
                        <li>
                          <a
                            className="font-medium text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                            href="#"
                          >
                            Analysis
                          </a>
                        </li>
                        <li>
                          <a
                            className="font-medium text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                            href="#"
                          >
                            API
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm/6 font-medium text-gray-950/50 dark:text-gray-50/50">
                        Company
                      </h3>
                      <ul className="mt-6 space-y-4 text-sm/6">
                        <li>
                          <a
                            className="font-medium text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                            href="#"
                          >
                            Careers
                          </a>
                        </li>
                        <li>
                          <a
                            className="font-medium text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                            href="/blog"
                          >
                            Blog
                          </a>
                        </li>
                        <li>
                          <a
                            className="font-medium text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                            href="/company"
                          >
                            Company
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm/6 font-medium text-gray-950/50 dark:text-gray-50/50">
                        Support
                      </h3>
                      <ul className="mt-6 space-y-4 text-sm/6">
                        <li>
                          <a
                            className="font-medium text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                            href="#"
                          >
                            Help center
                          </a>
                        </li>
                        <li>
                          <a
                            className="font-medium text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                            href="#"
                          >
                            Community
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm/6 font-medium text-gray-950/50 dark:text-gray-50/50">
                        Legal
                      </h3>
                      <ul className="mt-6 space-y-4 text-sm/6">
                        <li>
                          <a
                            className="font-medium text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                            href="#"
                          >
                            Terms of service
                          </a>
                        </li>
                        <li>
                          <a
                            className="font-medium text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                            href="#"
                          >
                            Privacy policy
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group/row relative isolate flex justify-between pt-[calc(theme(spacing.2)+1px)] last:pb-[calc(theme(spacing.2)+1px)]">
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"
                >
                  <div className="absolute inset-x-0 top-0 border-t border-gray-200 dark:border-gray-700"></div>
                  <div className="absolute inset-x-0 top-2 border-t border-gray-200 dark:border-gray-700"></div>
                  <div className="absolute inset-x-0 bottom-0 hidden border-b border-gray-200 group-last/row:block dark:border-gray-700"></div>
                  <div className="absolute inset-x-0 bottom-2 hidden border-b border-gray-200 group-last/row:block dark:border-gray-700"></div>
                </div>
                <div>
                  <div className="group/item relative py-3">
                    <svg
                      viewBox="0 0 15 15"
                      aria-hidden="true"
                      className="absolute -left-2 -top-2 hidden size-[15px] fill-gray-300 group-first/item:block dark:fill-gray-600"
                    >
                      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 15 15"
                      aria-hidden="true"
                      className="absolute -right-2 -top-2 size-[15px] fill-gray-300 dark:fill-gray-600"
                    >
                      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 15 15"
                      aria-hidden="true"
                      className="absolute -bottom-2 -left-2 hidden size-[15px] fill-gray-300 group-last/row:group-first/item:block dark:fill-gray-600"
                    >
                      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 15 15"
                      aria-hidden="true"
                      className="absolute -bottom-2 -right-2 hidden size-[15px] fill-gray-300 group-last/row:block dark:fill-gray-600"
                    >
                      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
                    </svg>
                    <div className="text-sm/6 text-gray-950 dark:text-gray-50">
                      © {new Date().getFullYear()} Radiant Inc.
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="group/item relative flex items-center gap-8 py-3">
                    <svg
                      viewBox="0 0 15 15"
                      aria-hidden="true"
                      className="absolute -left-2 -top-2 hidden size-[15px] fill-gray-300 group-first/item:block dark:fill-gray-600"
                    >
                      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 15 15"
                      aria-hidden="true"
                      className="absolute -right-2 -top-2 size-[15px] fill-gray-300 dark:fill-gray-600"
                    >
                      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 15 15"
                      aria-hidden="true"
                      className="absolute -bottom-2 -left-2 hidden size-[15px] fill-gray-300 group-last/row:group-first/item:block dark:fill-gray-600"
                    >
                      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 15 15"
                      aria-hidden="true"
                      className="absolute -bottom-2 -right-2 hidden size-[15px] fill-gray-300 group-last/row:block dark:fill-gray-600"
                    >
                      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z"></path>
                    </svg>
                    <a
                      target="_blank"
                      aria-label="Visit us on Facebook"
                      className="text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                      href="https://facebook.com"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16 8.05C16 3.603 12.418 0 8 0S0 3.604 0 8.05c0 4.016 2.926 7.346 6.75 7.95v-5.624H4.718V8.05H6.75V6.276c0-2.017 1.194-3.131 3.022-3.131.875 0 1.79.157 1.79.157v1.98h-1.008c-.994 0-1.304.62-1.304 1.257v1.51h2.219l-.355 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.95z"
                        ></path>
                      </svg>
                    </a>
                    <a
                      target="_blank"
                      aria-label="Visit us on X"
                      className="text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                      href="https://x.com"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path d="M12.6 0h2.454l-5.36 6.778L16 16h-4.937l-3.867-5.594L2.771 16H.316l5.733-7.25L0 0h5.063l3.495 5.114L12.6 0zm-.86 14.376h1.36L4.323 1.539H2.865l8.875 12.837z"></path>
                      </svg>
                    </a>
                    <a
                      target="_blank"
                      aria-label="Visit us on LinkedIn"
                      className="text-gray-950 hover:text-gray-950/75 dark:text-gray-50 dark:hover:text-gray-50/75"
                      href="https://linkedin.com"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path d="M14.82 0H1.18A1.169 1.169 0 000 1.154v13.694A1.168 1.168 0 001.18 16h13.64A1.17 1.17 0 0016 14.845V1.15A1.171 1.171 0 0014.82 0zM4.744 13.64H2.369V5.996h2.375v7.644zm-1.18-8.684a1.377 1.377 0 11.52-.106 1.377 1.377 0 01-.527.103l.007.003zm10.075 8.683h-2.375V9.921c0-.885-.015-2.025-1.234-2.025-1.218 0-1.425.966-1.425 1.968v3.775H6.233V5.997H8.51v1.05h.032c.317-.601 1.09-1.235 2.246-1.235 2.405-.005 2.851 1.578 2.851 3.63v4.197z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
