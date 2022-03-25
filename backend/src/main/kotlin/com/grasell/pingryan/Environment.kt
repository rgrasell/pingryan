package com.grasell.pingryan

import org.springframework.stereotype.Component

interface Environment {
    fun getStripeApiKey(): String
    fun getStripeSigningKey(): String
    fun getFromPhoneNumber(): String
    fun getToPhoneNumber(): String
    fun getTwilioSid(): String
    fun getTwilioAuthToken(): String
    fun getFrontendBaseUrl(): String
    fun isStaging(): Boolean
}

@Component
class EnvironmentImpl : Environment {
    private fun getFromAllSources(key: String): String {
        return System.getProperty(key) ?: System.getenv(key)
    }

    override fun getStripeApiKey() = getFromAllSources("STRIPE_API_KEY")
    override fun getStripeSigningKey() = getFromAllSources("STRIPE_SIGNING_KEY")
    override fun getFromPhoneNumber() = getFromAllSources("FROM_PHONE_NUMBER")
    override fun getToPhoneNumber() = getFromAllSources("TO_PHONE_NUMBER")
    override fun getTwilioSid() = getFromAllSources("TWILIO_SID")
    override fun getTwilioAuthToken() = getFromAllSources("TWILIO_AUTH_TOKEN")
    override fun getFrontendBaseUrl() = getFromAllSources("FRONTEND_BASE_URL")
    override fun isStaging() = getFromAllSources("IS_STAGING") == "true"
}