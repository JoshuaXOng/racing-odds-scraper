package racing.odds.desktop.components;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.function.Consumer;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.layout.VBox;

public class LoginForm {
  String username;
  String password;

  public VBox get(Consumer<ArrayList<String>> onSubmit) {
    VBox container = new VBox(20);
    container.setAlignment(Pos.CENTER);

    container
        .getChildren()
        .add(
            LabelledTextInput.get(
                "Username",
                "Username",
                username -> {
                  this.username = username;
                }));
    container
        .getChildren()
        .add(
            LabelledTextInput.get(
                "Password",
                "Password",
                password -> {
                  this.password = password;
                }));

    Button submitButton = new Button("Login");
    submitButton.getStyleClass().add("button-raised");
    submitButton.getStyleClass().add("login-form__submit-button");

    submitButton.setOnMouseReleased(
        e -> {
          onSubmit.accept(new ArrayList<String>(Arrays.asList(this.username, this.password)));
        });

    container.getChildren().add(submitButton);

    return container;
  }
}
