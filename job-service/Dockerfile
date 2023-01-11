FROM openjdk:11
ADD ./target/job-service-0.0.1-SNAPSHOT.jar /usr/src/job-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "job-service-0.0.1-SNAPSHOT.jar"]