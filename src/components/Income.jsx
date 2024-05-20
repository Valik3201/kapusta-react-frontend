import CategoryCard from "./CategoryCard";
import AddIncome from "./Icons/CategoriesIcons/AddIncome";
import Salary from "./Icons/CategoriesIcons/Salary";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks";

const Income = ({ period }) => {
  const [categoryAmounts, setCategoryAmounts] = useState({});
  const { user } = useAuth();

  console.log(user);

  useEffect(() => {
    if (user && user.transactions) {
      const filteredTransactions = user.transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const [month, year] = period.split(" ");
        return (
          transactionDate.getMonth() + 1 ===
            new Date(`${month} 1`).getMonth() + 1 &&
          transactionDate.getFullYear() === parseInt(year)
        );
      });

      const amounts = filteredTransactions.reduce(
        (acc, { category, amount }) => {
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += amount;
          return acc;
        },
        {}
      );

      setCategoryAmounts(amounts);
    }
  }, [period, user]);

  if (!user) {
    return (
      <div className="text-center text-3xl text-gray-darkest p-8">
        Loading...
      </div>
    );
  }

  /* mocked data 
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/src/db/user.json")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        const filteredTransactions = data.transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          const [month, year] = period.split(" ");
          return (
            transactionDate.getMonth() + 1 ===
              new Date(`${month} 1`).getMonth() + 1 &&
            transactionDate.getFullYear() === parseInt(year)
          );
        });
        const amounts = filteredTransactions.reduce(
          (acc, { category, amount }) => {
            if (!acc[category]) {
              acc[category] = 0;
            }
            acc[category] += amount;
            return acc;
          },
          {}
        );
        setCategoryAmounts(amounts);
      })
      .catch((error) => console.error("Error fetching the user data:", error));
  }, [period]);

  if (!user) {
    return (
      <div className="text-center text-3xl text-gray-darkest p-8">
        Loading...
      </div>
    );
  }*/

  return (
    <div className="flex flex-wrap items-start justify-stretch pb-2 pt-2 gap-5 pb-2 border-b border-gray-light-3 sm:border-none">
      <CategoryCard
        amount={(categoryAmounts["Salary"] || 0).toFixed(2)}
        Icon={Salary}
        category1="Salary"
      />
      <CategoryCard
        amount={(categoryAmounts["AddIncome"] || 0).toFixed(2)}
        Icon={AddIncome}
        category1="Add Income"
      />
    </div>
  );
};

Income.propTypes = {
  period: PropTypes.string.isRequired,
};

export default Income;