package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;
import racing.odds.desktop.components.LoginForm;

public class LoginPage {
  public Scene get() {
    VBox container = new VBox(20);
    container.setAlignment(Pos.CENTER);
    container.getStyleClass().add("login-page");

    VBox loginForm = (new LoginForm()).get(fields -> {});
    container.getChildren().add(loginForm);

    Scene scene = new Scene(container, 1280, 720);

    return scene;
  }
}
