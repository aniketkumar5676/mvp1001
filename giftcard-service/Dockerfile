FROM openjdk:11
ADD ./target/giftcard-service-0.0.1-SNAPSHOT.jar /usr/src/giftcard-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "giftcard-service-0.0.1-SNAPSHOT.jar"]
