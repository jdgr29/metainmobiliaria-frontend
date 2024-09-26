"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Euro, Coins, Info, Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

type Currency = "DOP" | "USD" | "EUR";

type Row = {
  payment: number;
  cuota: number;
  capital: number;
  interest: number;
  balance: number;
};

const currencyIcons = {
  DOP: <Coins className="w-4 h-4" />,
  USD: <DollarSign className="w-4 h-4" />,
  EUR: <Euro className="w-4 h-4" />,
};

const formatNumber = (value: number, currency: Currency) => {
  return new Intl.NumberFormat("es-DO", { style: "currency", currency }).format(
    value
  );
};

// Styles for PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  logo: { width: 50, height: 50 },
  companyName: { fontSize: 18, marginLeft: 10 },
  title: { fontSize: 24, marginBottom: 10 },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});

// PDF Document Component
const MyDocument = ({
  amortizationSchedule,
  currency,
}: {
  amortizationSchedule: Array<{
    payment: number;
    cuota: number;
    capital: number;
    interest: number;
    balance: number;
  }>;
  currency: Currency;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src="/assets/meta-logo-dark.png" style={styles.logo} />
        <Text style={styles.companyName}>Meta Inmobiliaria</Text>
      </View>
      <Text style={styles.title}>Tabla de Amortización</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>No.</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Cuota</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Capital</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Interés</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Balance</Text>
          </View>
        </View>
        {amortizationSchedule.map((row: Row) => (
          <View style={styles.tableRow} key={row.payment}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.payment}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {formatNumber(row.cuota, currency)}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {formatNumber(row.capital, currency)}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {formatNumber(row.interest, currency)}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {formatNumber(row.balance, currency)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default function LoanPage() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [numberOfPayments, setNumberOfPayments] = useState<string>("");
  const [annualInterestRate, setAnnualInterestRate] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("DOP");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [annualAmortizationRate, setAnnualAmortizationRate] = useState<
    number | null
  >(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<Array<{
    payment: number;
    cuota: number;
    capital: number;
    interest: number;
    balance: number;
  }> | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount.replace(/,/g, ""));
    const payments = parseFloat(numberOfPayments);
    const interest = parseFloat(annualInterestRate) / 100 / 12;

    if (principal > 0 && payments > 0 && interest > 0) {
      const x = Math.pow(1 + interest, payments);
      const monthly = (principal * x * interest) / (x - 1);
      setMonthlyPayment(monthly);

      const totalPayment = monthly * payments;
      const totalInterestPaid = totalPayment - principal;
      setTotalInterest(totalInterestPaid);
      const annualAmortization = (principal / totalPayment) * 100;
      setAnnualAmortizationRate(annualAmortization);

      // Calculate full amortization schedule
      let balance = principal;
      const schedule = [];
      for (let i = 1; i <= payments; i++) {
        const interestPayment = balance * interest;
        const capitalPayment = monthly - interestPayment;
        balance -= capitalPayment;
        schedule.push({
          payment: i,
          cuota: monthly,
          capital: capitalPayment,
          interest: interestPayment,
          balance: balance,
        });
      }
      setAmortizationSchedule(schedule);
    } else {
      setMonthlyPayment(null);
      setAnnualAmortizationRate(null);
      setTotalInterest(null);
      setAmortizationSchedule(null);
    }
  };

  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Calculadora de Préstamos Hipotecarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                calculateLoan();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  className="space-y-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <label
                    htmlFor="loanAmount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Monto del Préstamo
                  </label>
                  <div className="flex">
                    <Select
                      value={currency}
                      onValueChange={(value: Currency) => setCurrency(value)}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DOP">
                          <div className="flex items-center">
                            {currencyIcons.DOP}
                            <span className="ml-2">DOP</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="USD">
                          <div className="flex items-center">
                            {currencyIcons.USD}
                            <span className="ml-2">USD</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="EUR">
                          <div className="flex items-center">
                            {currencyIcons.EUR}
                            <span className="ml-2">EUR</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="loanAmount"
                      type="text"
                      value={loanAmount}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d]/g, "");
                        setLoanAmount(
                          value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        );
                      }}
                      className="flex-grow ml-2"
                      placeholder="Ej. 200,000"
                      required
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <label
                    htmlFor="numberOfPayments"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Número de Cuotas
                  </label>
                  <Input
                    id="numberOfPayments"
                    type="number"
                    value={numberOfPayments}
                    onChange={(e) => setNumberOfPayments(e.target.value)}
                    placeholder="Ej. 360 (30 años)"
                    required
                    min="1"
                  />
                </motion.div>
              </div>
              <motion.div
                className="space-y-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="annualInterestRate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tasa de Interés Anual (%)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 inline-block ml-2 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Ingrese la tasa de interés anual, por ejemplo, 5.5
                          para 5.5%
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
                <Input
                  id="annualInterestRate"
                  type="number"
                  value={annualInterestRate}
                  onChange={(e) => setAnnualInterestRate(e.target.value)}
                  placeholder="Ej. 5.5"
                  required
                  min="0.01"
                  step="0.01"
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button type="submit" className="w-full">
                  Calcular
                </Button>
              </motion.div>
            </form>
            <AnimatePresence>
              {monthlyPayment !== null &&
                annualAmortizationRate !== null &&
                totalInterest !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 p-4 bg-secondary rounded-lg"
                  >
                    <h3 className="text-lg font-semibold mb-2">Resultados:</h3>
                    <p className="mb-2">
                      Cuota Mensual: {currencyIcons[currency]}
                      <span className="font-bold">
                        {formatNumber(monthlyPayment, currency)}
                      </span>
                    </p>
                    <p className="mb-2">
                      Tasa de Amortización Anual:
                      <span className="font-bold">
                        {annualAmortizationRate.toFixed(2)}%
                      </span>
                    </p>
                    <p>
                      Interés Total Pagado: {currencyIcons[currency]}
                      <span className="font-bold">
                        {formatNumber(totalInterest, currency)}
                      </span>
                    </p>
                  </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
              {amortizationSchedule && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-6"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">
                      Tabla de Amortización:
                    </h3>
                    <PDFDownloadLink
                      document={
                        <MyDocument
                          amortizationSchedule={amortizationSchedule}
                          currency={currency}
                        />
                      }
                      fileName="amortizacion.pdf"
                    >
                      {({ loading }: { loading: boolean }) =>
                        loading ? (
                          "Cargando documento..."
                        ) : (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Descargar PDF
                          </Button>
                        )
                      }
                    </PDFDownloadLink>
                  </div>
                  <div
                    className="overflow-x-auto"
                    style={{ maxHeight: "400px" }}
                  >
                    <table className="min-w-full bg-white border border-gray-300">
                      <thead className="sticky top-0 bg-gray-100">
                        <tr>
                          <th className="py-2 px-4 border-b">No.</th>
                          <th className="py-2 px-4 border-b">Cuota</th>
                          <th className="py-2 px-4 border-b">Capital</th>
                          <th className="py-2 px-4 border-b">Interés</th>
                          <th className="py-2 px-4 border-b">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {amortizationSchedule.map((row, index) => (
                          <motion.tr
                            key={row.payment}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.02 }}
                            className="hover:bg-gray-50"
                          >
                            <td className="py-2 px-4 border-b text-center">
                              {row.payment}
                            </td>
                            <td className="py-2 px-4 border-b text-right">
                              {formatNumber(row.cuota, currency)}
                            </td>
                            <td className="py-2 px-4 border-b text-right">
                              {formatNumber(row.capital, currency)}
                            </td>
                            <td className="py-2 px-4 border-b text-right">
                              {formatNumber(row.interest, currency)}
                            </td>
                            <td className="py-2 px-4 border-b text-right">
                              {formatNumber(row.balance, currency)}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </React.Fragment>
  );
}
