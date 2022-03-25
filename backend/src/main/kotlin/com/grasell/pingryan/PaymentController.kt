package com.grasell.pingryan

import com.stripe.model.PaymentIntent
import com.stripe.model.checkout.Session
import com.stripe.param.PaymentIntentCreateParams
import com.stripe.param.PaymentIntentUpdateParams
import com.stripe.param.checkout.SessionCreateParams
import org.springframework.web.bind.annotation.*


@RestController
class PaymentController(val environment: Environment) {

    data class PaymentIntentRequest(val message: String)
    data class PaymentIntentReponse(val clientSecret: String)

    @RequestMapping(method = [RequestMethod.POST], path = ["/paymentIntent"])
    @CrossOrigin(origins = ["*"])
    @ResponseBody
    fun paymentIntent(@RequestBody request: PaymentIntentRequest): PaymentIntentReponse {
        val params = PaymentIntentCreateParams.builder()
            .setAmount(100)
            .setCurrency("usd")
            .setAutomaticPaymentMethods(
                PaymentIntentCreateParams.AutomaticPaymentMethods
                    .builder()
                    .setEnabled(true)
                    .build()
            )
            .putMetadata("message", request.message)
            .build()

        val paymentIntent = PaymentIntent.create(params)

        return PaymentIntentReponse(paymentIntent.clientSecret)
    }


    data class CheckoutRequest(val message: String)
    data class CheckoutResponse(val url: String)

    @RequestMapping(method = [RequestMethod.POST], path = ["/checkout"])
    @CrossOrigin(origins = ["*"])
    @ResponseBody
    fun checkout(@RequestBody request: CheckoutRequest): CheckoutResponse {
        val params: SessionCreateParams = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl(environment.getFrontendBaseUrl() + "?session_id={CHECKOUT_SESSION_ID}")
            .setCancelUrl(environment.getFrontendBaseUrl())
            .putMetadata("message", request.message)
            .addLineItem(
                SessionCreateParams.LineItem.builder()
                    .setQuantity(1)
                    .setPriceData(
                        SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("usd")
                            .setUnitAmount(100)
                            .setProductData(
                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                    .setName("Premium Ping")
                                    .setDescription(request.message)
                                    .build()
                            )
                            .build()
                    )
                    .build()
            )
            .build()

        val session = Session.create(params)

        return CheckoutResponse(url = session.url)
    }

}