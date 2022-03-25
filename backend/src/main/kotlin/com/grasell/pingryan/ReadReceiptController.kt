package com.grasell.pingryan

import com.stripe.model.PaymentIntent
import com.stripe.model.checkout.Session
import org.springframework.web.bind.annotation.*


@RestController
class ReadReceiptController {

    data class GetReadReceiptResponse(val delivered: Boolean)

    @RequestMapping(method = [RequestMethod.GET], path = ["/readReceipt"])
    @CrossOrigin(origins = ["*"])
    @ResponseBody
    fun getReadReceipt(@RequestParam sessionId: String): GetReadReceiptResponse {
        val session = Session.retrieve(sessionId)
        val paymentIntent = PaymentIntent.retrieve(session.paymentIntent)
        val read = !paymentIntent.metadata["delivered"].isNullOrBlank()

        return GetReadReceiptResponse(read)
    }
}