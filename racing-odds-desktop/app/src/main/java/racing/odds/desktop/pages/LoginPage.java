package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import racing.odds.desktop.components.LoginForm;
import racing.odds.desktop.services.DemoAPI;

public class LoginPage {
  public static Scene get(Stage stage) {
    VBox container = new VBox(20);
    container.setAlignment(Pos.CENTER);
    container.getStyleClass().add("login-page");

    VBox loginForm =
        (new LoginForm())
            .get(
                fields -> {
                  try {
                    System.out.println(DemoAPI.getAuthToken(fields.get(0), fields.get(1)));
                  } catch (Exception exception) {
                    System.out.println("nooohh");
                  }
                });
    container.getChildren().add(loginForm);

    Scene scene = new Scene(container, 1280, 720);

    return scene;
  }
}
