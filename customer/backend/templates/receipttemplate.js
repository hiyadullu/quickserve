export function receiptTemplate({ name, email, amount, date, paymentId }) {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              background: #f7f7f7;
            }
            .container {
              background: white;
              padding: 20px 30px;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
              max-width: 600px;
              margin: auto;
            }
            h1 {
              text-align: center;
              color: #2e86de;
            }
            .details {
              margin-top: 20px;
            }
            .details p {
              margin: 8px 0;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Payment Receipt</h1>
            <div class="details">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Amount Paid:</strong> ₹${amount}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Payment ID:</strong> ${paymentId}</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
  