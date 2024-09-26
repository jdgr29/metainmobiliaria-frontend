import React from "react";
import LoanPage from "@/components/loan.page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta Inmobiliaria | caluladora de préstamos",
};
export default function Loan() {
  return (
    <React.Fragment>
      <LoanPage />
    </React.Fragment>
  );
}
