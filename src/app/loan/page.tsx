import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the LoanPage component with a loading fallback
const LoanPage = dynamic(() => import("@/components/loan.page"), {
  loading: () => <p>Loading...</p>, // You can replace this with a spinner or skeleton
  ssr: false, // Optionally disable server-side rendering for this component
});

function Loan() {
  return (
    <React.Fragment>
      <LoanPage />
    </React.Fragment>
  );
}

export default Loan;
