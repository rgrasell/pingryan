package com.grasell.pingryan

import com.twilio.Twilio
import com.twilio.rest.api.v2010.account.Call
import com.twilio.rest.api.v2010.account.Message
import com.twilio.twiml.VoiceResponse
import com.twilio.twiml.voice.Pause
import com.twilio.twiml.voice.Play
import com.twilio.twiml.voice.Say
import com.twilio.type.PhoneNumber
import com.twilio.type.Twiml
import org.springframework.context.annotation.Configuration


interface NotificationService {
    fun notify(message: String)
}

@Configuration
class NotificationServiceImpl(val environment: Environment): NotificationService {
    override fun notify(message: String) {
        val prefix = if (environment.isStaging()) "STAGING: " else ""
        val prefixedMessage = prefix + message

        Twilio.init(environment.getTwilioSid(), environment.getTwilioAuthToken())

        val from = environment.getFromPhoneNumber()
        val to = environment.getToPhoneNumber()

        Message.creator(PhoneNumber(to), PhoneNumber(from), prefixedMessage).create()

        val twiml = Twiml(
            VoiceResponse.Builder()
            .pause(Pause.Builder().length(2).build())
            .say(Say.Builder(prefixedMessage).build())
            .play(Play.Builder("https://demo.twilio.com/docs/classic.mp3").build())
            .build().toXml())

        Call.creator(PhoneNumber(to), PhoneNumber(from), twiml).create()
    }
}