package com.grasell.pingryan

import com.stripe.Stripe
import org.springframework.beans.factory.InitializingBean
import org.springframework.context.annotation.Configuration

@Configuration
class StripeConfig(val environment: Environment) : InitializingBean {

    override fun afterPropertiesSet() {
        Stripe.apiKey = environment.getStripeApiKey()
    }
}