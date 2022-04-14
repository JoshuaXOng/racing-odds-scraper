package racing.odds.desktop.services;

import io.github.cdimascio.dotenv.Dotenv;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

public class DemoAPI {
  static Dotenv dotenv = Dotenv.load();

  static HttpClient httpClient = HttpClient.newBuilder().build();

  public static String getAuthToken(String username, String password) throws Exception {
    HttpResponse<String> response =
        DemoAPI.httpClient.send(
            HttpRequest.newBuilder()
                .POST(
                    BodyPublishers.ofString(
                        String.format(
                            "{ \"userName\": \"%s\", \"password\": \"%s\" }", username, password)))
                .uri(new URI(DemoAPI.dotenv.get("API_AUTH_TOKEN_EP")))
                .header("accept", "application/json")
                .header("Authorization", DemoAPI.dotenv.get("API_KEY"))
                .header("Content-Type", "application/json")
                .build(),
            BodyHandlers.ofString());
    if (response.statusCode() == 200) return response.body();
    else throw new Exception("Request to auth token end-point failed.");
  }

  public static String verifyToken(String token) throws Exception {
    HttpResponse<String> response =
        DemoAPI.httpClient.send(
            HttpRequest.newBuilder()
                .POST(BodyPublishers.ofString(String.format("{ \"jwt\": \"%s\" }", token)))
                .uri(new URI(DemoAPI.dotenv.get("API_VERIFY_TOKEN_EP")))
                .header("accept", "application/json")
                .header("Authorization", DemoAPI.dotenv.get("API_KEY"))
                .header("Content-Type", "application/json")
                .build(),
            BodyHandlers.ofString());
    if (response.statusCode() == 200) return response.body();
    else throw new Exception("Request to verify token end-point failed.");
  }

  public static String getUsers() throws Exception {
    HttpResponse<String> response =
        DemoAPI.httpClient.send(
            HttpRequest.newBuilder()
                .GET()
                .uri(new URI(DemoAPI.dotenv.get("API_USERS_EP")))
                .header("accept", "application/json")
                .header("Authorization", DemoAPI.dotenv.get("API_KEY"))
                .build(),
            BodyHandlers.ofString());
    if (response.statusCode() == 200) return response.body();
    else throw new Exception("Request to get users end-point failed.");
  }
}
