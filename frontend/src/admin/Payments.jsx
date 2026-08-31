import { useEffect, useState } from "react";
import api from "../services/api";

function Payments() {

  const [payments, setPayments] =
    useState([]);

  useEffect(() => {

    const loadPayments = async () => {

      try {

        const response =
          await api.get(
            "/admin/payments"
          );

        setPayments(
          response.data.payments ||
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

    loadPayments();

  }, []);

  return (
    <div className="admin-page">

      <h1>
        Payments
      </h1>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>User</th>
              <th>Booking</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {payments.map(
              (payment) => (

                <tr key={payment._id}>

                  <td>
                    {payment.user?.name ||
                      payment.booking?.user?.name}
                  </td>

                  <td>
                    {payment.booking?._id}
                  </td>

                  <td>
                    ₹{payment.amount}
                  </td>

                  <td>
                    {payment.paymentMethod}
                  </td>

                  <td>
                    {payment.status}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Payments;