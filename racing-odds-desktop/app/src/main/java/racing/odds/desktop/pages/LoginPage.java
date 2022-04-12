package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import racing.odds.desktop.components.LoginForm;

public class LoginPage {
  public static Scene get(Stage stage) {
    VBox layout = new VBox(20);
    layout.setAlignment(Pos.CENTER);
    Scene scene = new Scene(layout, 1280, 720);

    VBox loginForm = LoginForm.get(fields -> { System.out.println(fields); });
    ((VBox) scene.getRoot()).getChildren().add(loginForm);

    return scene;
  }
}
