import { useEffect, useState } from "react";
import api from "../services/api";

function Payments() {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const response = await api.get("payments/");

      console.log(response.data);

      setPayments(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Payments</h2>
      <div className="row">
        {payments.map((payment)=>(
          <div className="col-md-4 mb-4" key={payment.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">
                  Transaction: {payment.transaction_id}
                </h5>
                <p><strong>Amount:</strong>₹{payment.amount}
                </p>
                <p><strong>Status:</strong>{payment.payment_status}
                </p>
                <p><strong>Date:</strong>{" "}
                {payment.payment_date.substring(0,10)}
                </p>
                <p><strong>Course ID:</strong>{payment.course}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payments;