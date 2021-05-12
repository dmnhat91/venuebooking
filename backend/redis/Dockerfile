FROM openjdk:12

COPY ./target/redis.jar /usr/app/

ENTRYPOINT ["java","-jar","/usr/app/redis.jar"]