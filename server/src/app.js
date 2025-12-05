import express from 'express';
import router from './router/index.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import responseMessage from './constant/responseMessage.js';
import httpError from './util/httpError.js';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

app.get('/test', (req, res) => {
res.send(`<!DOCTYPE html>
<html>
<body>
  <h2>PayU Payment Test</h2>

  <form id="payuForm" action="https://test.payu.in/_payment" method="POST">

    <input type="hidden" name="key" value="yJ49mB" />
    <input type="hidden" name="txnid" value="PAYU_1764844549010" />
    <input type="hidden" name="amount" value="90000" />

    <input 
      type="hidden" 
      name="productinfo" 
      value='{"propertyId":"6929961463a1a31d483c62d0","bookingId":"6931640433278ea2715368ef","transactionId":"PAYU_1764844549010"}'
    />

    <!-- REQUIRED BY PAYU -->
    <input type="hidden" name="firstname" value="Harsh" />
    <input type="hidden" name="email" value="harsh@example.com" />
    <input type="hidden" name="phone" value="7342343243" />

    <input type="hidden" name="surl" value="http://localhost:5000/v1/bookings/payment-success" />
    <input type="hidden" name="furl" value="http://localhost:5000/v1/bookings/payment-failure" />

    <input 
      type="hidden" 
      name="hash" 
      value="6535e72680069efb5bc68e5d87bf8745ffb1dda4046fb0f4ded21a8d9f49bdb2b422c9853d46f02d69a6da724ec5cfe7af48ed3c7494c85986dc9a479c547132"
    />

    <button type="submit">Pay Now</button>
  </form>

</body>
</html>



`);
})

app.use(cors());
app.use(
  helmet()
);



app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/api/v1', router);

app.use((req, res, next) => {
    try {
        throw new Error(responseMessage.ERROR.NOT_FOUND('route'));
    } catch (err) {
        httpError(next, err, req, 404);
    }
});

app.use(globalErrorHandler);

export default app;
