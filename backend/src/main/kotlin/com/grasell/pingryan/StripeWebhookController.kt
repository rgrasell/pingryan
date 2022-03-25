package com.grasell.pingryan

import com.stripe.exception.SignatureVerificationException
import com.stripe.model.PaymentIntent
import com.stripe.model.checkout.Session
import com.stripe.net.Webhook
import com.stripe.param.PaymentIntentUpdateParams
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest


@RestController
class StripeWebhookController(val notificationService: NotificationService, val environment: Environment) {

    @RequestMapping(method = [RequestMethod.POST], path = ["/stripeWebhook"])
    fun stripeWebhook(request: HttpServletRequest): ResponseEntity<String> {
        val requestBody = request.reader.readText()
        val signature = request.getHeader("Stripe-Signature")

        try {
            val event = Webhook.constructEvent(requestBody, signature, environment.getStripeSigningKey())

            val dataObjectDeserializer = event.dataObjectDeserializer
            val stripeObject = dataObjectDeserializer.getObject().get()
            println("Got webhook for ${event.type}")
            when (event.type) {
                "checkout.session.completed" -> {
                    // This fulfills immediately, even for async payment methods.
                    val checkoutSession = stripeObject as Session
                    val message = checkoutSession.metadata["message"]!!
                    notificationService.notify(message)
                    PaymentIntent.retrieve(checkoutSession.paymentIntent).update(PaymentIntentUpdateParams.builder()
                        .putMetadata("message", message)
                        .putMetadata("delivered", true.toString())
                        .build()
                    )
                }
            }
        }
        catch (e: SignatureVerificationException) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad input");
        }

        return ResponseEntity.status(HttpStatus.OK).body("");
    }
}