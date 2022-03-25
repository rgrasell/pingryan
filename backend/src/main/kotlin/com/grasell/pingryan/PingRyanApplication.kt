package com.grasell.pingryan

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PingRyanApplication

fun main(args: Array<String>) {
	runApplication<PingRyanApplication>(*args)
}
