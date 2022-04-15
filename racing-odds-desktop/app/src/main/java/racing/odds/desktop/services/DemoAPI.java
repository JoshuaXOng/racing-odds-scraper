package racing.odds.desktop.services;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import io.github.cdimascio.dotenv.Dotenv;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.CompletableFuture;

public class DemoAPI {
  static Dotenv dotenv = Dotenv.load();

  static HttpClient httpClient = HttpClient.newBuilder().build();

  static Gson gson = new Gson();

  public static class AuthTokenResponseBody {
    public String jwt;
  }

  public static CompletableFuture<AuthTokenResponseBody> getAuthToken(
      String username, String password) throws Exception {
    CompletableFuture<AuthTokenResponseBody> authToken =
        DemoAPI.httpClient
            .sendAsync(
                HttpRequest.newBuilder()
                    .POST(
                        BodyPublishers.ofString(
                            String.format(
                                "{ \"userName\": \"%s\", \"password\": \"%s\" }",
                                username, password)))
                    .uri(new URI(DemoAPI.dotenv.get("API_AUTH_TOKEN_EP")))
                    .header("accept", "application/json")
                    .header("Authorization", DemoAPI.dotenv.get("API_KEY"))
                    .header("Content-Type", "application/json")
                    .build(),
                BodyHandlers.ofString())
            .thenApply(HttpResponse::body)
            .thenApply((body) -> gson.fromJson(body, AuthTokenResponseBody.class));
    return authToken;
  }

  public static class VerifyTokenResponseBody {
    Boolean isValid;

    public VerifyTokenResponseBody(Boolean isValid) {
      this.isValid = isValid;
    }
  }

  public static CompletableFuture<VerifyTokenResponseBody> verifyToken(String token)
      throws Exception {
    CompletableFuture<VerifyTokenResponseBody> verifyResult =
        DemoAPI.httpClient
            .sendAsync(
                HttpRequest.newBuilder()
                    .POST(BodyPublishers.ofString(String.format("{ \"jwt\": \"%s\" }", token)))
                    .uri(new URI(DemoAPI.dotenv.get("API_VERIFY_TOKEN_EP")))
                    .header("accept", "application/json")
                    .header("Authorization", DemoAPI.dotenv.get("API_KEY"))
                    .header("Content-Type", "application/json")
                    .build(),
                BodyHandlers.ofString())
            .thenApply(HttpResponse::statusCode)
            .thenApply((statusCode) -> new VerifyTokenResponseBody(statusCode == 200));
    return verifyResult;
  }

  public static class UserResponseBody {
    String id;
    String givenName;
    String familyName;
    String userName;
    String phoneNumber;
    Boolean isCustomer;
    Boolean isReceptionist;
    Boolean isHealthcareWorker;

    @Override
    public String toString() {
      return this.givenName;
    }
  }

  public static CompletableFuture<HttpResponse<String>> getUsers() throws Exception {
    CompletableFuture<HttpResponse<String>> response =
        DemoAPI.httpClient.sendAsync(
            HttpRequest.newBuilder()
                .GET()
                .uri(new URI(DemoAPI.dotenv.get("API_USERS_EP")))
                .header("accept", "application/json")
                .header("Authorization", DemoAPI.dotenv.get("API_KEY"))
                .build(),
            BodyHandlers.ofString());
    return response;
  }

  public static class TestingSiteResponseBody {
    public String id;
    public String name;
    public String description;
    public String websiteUrl;
    public String phoneNumber;
    public String createdAt;
    public String updatedAt;
    public HashMap<String, Object> additionalInfo;

    @Override
    public String toString() {
      return gson.toJson(this);
    }
  }

  public static CompletableFuture<ArrayList<TestingSiteResponseBody>> getTestingSites()
      throws Exception {
    CompletableFuture<ArrayList<TestingSiteResponseBody>> response =
        DemoAPI.httpClient
            .sendAsync(
                HttpRequest.newBuilder()
                    .GET()
                    .uri(new URI(DemoAPI.dotenv.get("API_TESTING_SITES_EP")))
                    .header("accept", "application/json")
                    .header("Authorization", DemoAPI.dotenv.get("API_KEY"))
                    .build(),
                BodyHandlers.ofString())
            .thenApply(HttpResponse::body)
            .thenApply(
                (body) ->
                    gson.fromJson(
                        body, new TypeToken<ArrayList<TestingSiteResponseBody>>() {}.getType()));
    return response;
  }
}
