package venuebooking;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootRedis {

	private static final Logger LOG = LoggerFactory.getLogger(SpringbootRedis.class);
	
	// Main program to start up the spring boot application.
	public static void main(String[] args) {
		SpringApplication.run(SpringbootRedis.class, args);
		LOG.info("Springboot redis application is started successfully.");
	}
}
