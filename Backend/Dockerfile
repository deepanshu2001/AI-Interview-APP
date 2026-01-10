FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

COPY . .
RUN chmod +x mvnw
RUN ./mvnw package -DskipTests
RUN mv target/*.jar app.jar
EXPOSE  8080
ENTRYPOINT ["java", "-jar", "app.jar"]
