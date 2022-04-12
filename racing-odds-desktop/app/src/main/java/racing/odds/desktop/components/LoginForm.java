package racing.odds.desktop.components;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.function.Consumer;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.layout.VBox;
import javafx.scene.text.Text;
import racing.odds.desktop.DataStore;
import racing.odds.desktop.Utils;
import racing.odds.desktop.pages.JavaFXDemoPage;
import racing.odds.desktop.services.DemoAPI;

public class LoginForm {
  String username;
  String password;

  public VBox get(Consumer<ArrayList<String>> onSubmit) {
    VBox container = new VBox(20);
    container.setAlignment(Pos.CENTER);

    Text submitAlert = new Text("Credentials have failed!");
    submitAlert.getStyleClass().add("login-page__alert");
    container.getChildren().add(submitAlert);

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
          try {
            DataStore.authToken = DemoAPI.getAuthToken(this.username, this.password);
            DataStore.mainStage.setScene(JavaFXDemoPage.get());
          } catch (Exception exception) {
            submitAlert.getStyleClass().remove("login-page__alert");
            Utils.setTimeout(() -> { submitAlert.getStyleClass().add("login-page__alert"); }, 5000);
          }
          
          onSubmit.accept(new ArrayList<String>(Arrays.asList(this.username, this.password)));
        });

    container.getChildren().add(submitButton);

    return container;
  }
}
