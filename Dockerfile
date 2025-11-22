# ---- Backend (Spring Boot) Multi-stage ----
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
# Pre-fetch dependencies (layer caching)
RUN ./mvnw -q dependency:go-offline
COPY src src
RUN ./mvnw -q package -DskipTests

FROM eclipse-temurin:17-jre AS runtime
WORKDIR /app
# Use non-root user for security
RUN useradd -u 1001 spring && mkdir /data && chown spring:spring /data
COPY --from=build /app/target/*SNAPSHOT.jar app.jar
EXPOSE 8080
USER spring
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar app.jar"]